import { Button, message, Popconfirm, Table, Upload, Pagination } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteArtist,
  deleteSongsByArtistId,
  getArtistList,
  addArtist,
} from "../api/artistServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CSVLink } from "react-csv";
import Papa from "papaparse";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";
import { useSelector } from "react-redux";
import usePermissions from "../hooks/usePermissions";
import { useState } from "react";

const Artist = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const permissions = usePermissions(user.role.role);

  const { data, isLoading, error } = useQuery({
    queryKey: ["artists", page, pageSize],
    queryFn: () => getArtistList(page, pageSize),
    keepPreviousData: true, // Keep previous data while fetching new data
  });

  const { mutate } = useMutation({
    mutationFn: (id) => deleteArtist(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["artists", page, pageSize]);
      message.success("Artist and his/her songs deleted successfully.");
    },
    onError: (err) => {
      message.error(err.message ? err.message : "Error deleting artist");
    },
  });

  const { mutateAsync: mutateSongs } = useMutation({
    mutationFn: (artist_id) => deleteSongsByArtistId(artist_id),
  });

  const onDelete = async (id) => {
    try {
      await mutateSongs(id);
    } catch (error) {
      // message.error("Error occurred while deleting the artist or their songs.");
    } finally {
      mutate(id);
    }
  };

  const { mutateAsync: importMutate } = useMutation({
    mutationFn: (artists) => addArtist(artists),
    onSuccess: () => {},
    onError: (err) => {
      message.error(err.message ? err.message : "Error importing artists");
    },
  });

  const handleCSVImport = (info) => {
    if (info.file.status === "done") {
      Papa.parse(info.file.originFileObj, {
        header: true,
        complete: async (result) => {
          const artists = result.data.map((artist) => {
            const { id, created_at, updated_at, ...rest } = artist;
            return {
              ...rest,
              dob: rest.dob ? moment(rest.dob).format("YYYY-MM-DD") : null,
            };
          });

          for (const artist of artists) {
            try {
              await importMutate(artist);
            } catch (error) {
              message.error(
                `Error importing artist: ${artist.name}. ${error.message}`
              );
            }
          }

          message.success("CSV file processed and artists imported.");
          queryClient.invalidateQueries(["artists", page, pageSize]);
        },
        error: () => {
          message.error("Error parsing CSV file.");
        },
      });
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "DOB",
      dataIndex: "dob",
      key: "dob",
      render: (text) => <p>{text.split("T")[0]}</p>,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (text) => <p className="capitalize">{text}</p>,
    },
    { title: "Address", dataIndex: "address", key: "address" },
    {
      title: "First Release Year",
      dataIndex: "first_release_year",
      key: "first_release_year",
    },
    {
      title: "No of Albums Released",
      dataIndex: "no_of_albums_released",
      key: "no_of_albums_released",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className="flex gap-5">
          {permissions.song.Read && (
            <Button type="primary">
              <Link to={`/music?artist_id=${record.id}&name=${record.name}`}>
                View Songs
              </Link>
            </Button>
          )}
          {permissions.artist.Update && (
            <Button
              onClick={() => navigate("/artists/create", { state: record })}
            >
              Edit
            </Button>
          )}
          {permissions.artist.Delete && (
            <Popconfirm
              title="Delete the artist"
              description="Are you sure to delete this artist and his/her songs?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => onDelete(record.id)}
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          )}
        </div>
      ),
    },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePageSizeChange = (current, size) => {
    setPage(1); // Reset to first page when pageSize changes
    setPageSize(size);
  };

  return (
    <div>
      <div className="flex flex-row  w-full  xsm:flex-col md:flex-row lg:flex-row   gap-5 items-stretch">
        <h1>Artists</h1>
        <div className="flex flex-col gap-4 sm:flex-col md:flex-row sm:w-full mb-6 ">
          {permissions.artist.Create && (
            <Button
              onClick={() => navigate("/artists/create")}
              type="primary"
              style={{ marginBottom: "16px" }}
            >
              Create New Artist
            </Button>
          )}
          {permissions.csv.download && (
            <CSVLink
              className="bg-green-600 mb-5 text-center py-[5px] px-[20px] text-white rounded-md"
              filename={"artists.csv"}
              data={data?.artists ? data?.artists : []}
            >
              Export CSV
            </CSVLink>
          )}
          {permissions.csv.upload && (
            <Upload
              accept=".csv"
              showUploadList={false}
              customRequest={({ file, onSuccess }) => {
                setTimeout(() => onSuccess("ok"), 0); // To simulate successful upload
              }}
              onChange={handleCSVImport}
            >
              <Button icon={<UploadOutlined />}>Import CSV</Button>
            </Upload>
          )}
        </div>
      </div>
      <Table
        columns={columns}
        scroll={{ x: 400 }}
        dataSource={data?.artists}
        rowKey={(record) => record.id} // Use a unique key for each row
        pagination={false} // Disable built-in pagination
      />
      <div className="flex mt-8 justify-end items-end">
        <Pagination
          current={page}
          pageSize={pageSize}
          total={data?.pagination.totalPages}
          onChange={handlePageChange}
          onShowSizeChange={handlePageSizeChange}
          showSizeChanger
          pageSizeOptions={[1, 4, 10, 20, 30, 40]}
        />
      </div>
    </div>
  );
};

export default Artist;
