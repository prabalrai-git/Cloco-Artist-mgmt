import React from "react";
import { Table, Button, message } from "antd";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteMusic, getMusicListByArtistId } from "../api/musicServices";

const Music = () => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const { data, error } = useQuery({
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
      render: (text, record) => (
        <div className="flex gap-5">
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
          <Button
            onClick={() =>
              navigate(`/music/create?artist_id=${params.get("artist_id")}`)
            }
            type="primary"
            style={{ marginBottom: "16px" }}
          >
            Add a new song
          </Button>
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
