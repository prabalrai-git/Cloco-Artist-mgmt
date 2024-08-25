import React from "react";
import { Button, message, Table } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { deleteArtist, getArtistList } from "../api/artistServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Artist = () => {
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "DOB",
      dataIndex: "dob",
      key: "dob",
      render: (text, record) => <p>{text.split("T")[0]}</p>,
    },
    { title: "Gender", dataIndex: "gender", key: "gender" },
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
          <Button type="primary">
            <Link to={`/music?artist_id=${record.id}&name=${record.name}`}>
              View Songs
            </Link>
          </Button>
          <Button>Edit</Button>
          <Button onClick={() => onDelete(record.id)} danger>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (id) => deleteArtist(id),
    onSuccess: () => {
      queryClient.invalidateQueries("artists");
      message.success("Artist deleted successfully.");
    },
    onError: (err) => {
      message.error(err.message ? err.message : "Error deleting artists");
    },
  });

  const onDelete = (id) => {
    mutate(id);
  };
  const navigate = useNavigate();

  const { data, error } = useQuery({
    queryKey: ["artists"],
    queryFn: getArtistList,
  });

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1>Artist</h1>
        <Button
          onClick={() => navigate("/artists/create")}
          type="primary"
          style={{ marginBottom: "16px" }}
        >
          Create New Artist
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data?.artists}
        rowKey={(record) => record.id} // Use a unique key for each row
      />
    </div>
  );
};

export default Artist;
