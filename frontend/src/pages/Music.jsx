import React from "react";
import { Table, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const dummySongs = [
  {
    id: 2,
    title: "Syndicate",
    album_name: "Ode to my father",
    genre: "Experimental",
    created_at: "2024-08-19T16:43:21.000Z",
    updated_at: "2024-08-19T16:44:49.000Z",
    artist_id: 1,
  },
];

const Music = () => {
  const navigate = useNavigate();
  const { artistId } = useParams();

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
    // {
    //   title: "Created At",
    //   dataIndex: "created_at",
    //   key: "created_at",
    // },
    // {
    //   title: "Updated At",
    //   dataIndex: "updated_at",
    //   key: "updated_at",
    // },
  ];

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1>Songs for Artist {artistId}</h1>
        <Button
          onClick={() => navigate("/artists")}
          style={{ marginBottom: "16px" }}
        >
          Back
        </Button>
      </div>

      <Table dataSource={dummySongs} columns={columns} rowKey="id" />
    </div>
  );
};

export default Music;
