import { Table, Button, message, Popconfirm } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteMusic, getMusicListByArtistId } from "../api/musicServices";
import { useSelector } from "react-redux";
import usePermissions from "../hooks/usePermissions";

const Music = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const permissions = usePermissions(user.role.role);
  const [params, setParams] = useSearchParams();

  const { data } = useQuery({
    queryKey: ["songs"],
    queryFn: () => getMusicListByArtistId(params.get("artist_id")),
  });

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Album Name",
      dataIndex: "album_name",
      key: "album_name",
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
    },
    {
      title: "Actions",
      key: "actions",
      hidden: !permissions.song.Update || !permissions.song.Delete,
      render: (text, record) => (
        <div className="flex gap-5">
          {permissions.song.Update && (
            <Button
              onClick={() => navigate("/music/create", { state: record })}
            >
              Edit
            </Button>
          )}
          {permissions.song.Delete && (
            <Popconfirm
              title="Delete the user"
              description="Are you sure to delete this user?"
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
  ].filter((item) => !item.hidden);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (id) => deleteMusic(id),
    onSuccess: () => {
      queryClient.invalidateQueries("songs");
      message.success("Song deleted successfully.");
    },
    onError: (err) => {
      message.error(err.message ? err.message : "Error deleting song");
    },
  });

  const onDelete = (id) => {
    mutate(id);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1>{params.get("name")}'s Songs</h1>
        <div className="flex gap-5">
          {permissions.song.Create && (
            <Button
              onClick={() =>
                navigate(`/music/create?artist_id=${params.get("artist_id")}`)
              }
              type="primary"
              style={{ marginBottom: "16px" }}
            >
              Add a new song
            </Button>
          )}
          <Button
            onClick={() => navigate("/artists")}
            style={{ marginBottom: "16px" }}
          >
            Back
          </Button>
        </div>
      </div>

      <Table dataSource={data?.music} columns={columns} rowKey="id" />
    </div>
  );
};

export default Music;
