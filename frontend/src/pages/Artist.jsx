import React from "react";
import { Button, Table } from "antd";
import { dummyArtists } from "../data/dummyData";
import { Link, useNavigate } from "react-router-dom";

const Artist = () => {
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "DOB", dataIndex: "dob", key: "dob" },
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
    // { title: "Created At", dataIndex: "created_at", key: "created_at" },
    // { title: "Updated At", dataIndex: "updated_at", key: "updated_at" },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Button type="primary">
          <Link to={`/music/${record.id}`}>View Songs</Link>
        </Button>
      ),
    },
  ];
  const navigate = useNavigate();

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
        dataSource={dummyArtists}
        rowKey={(record) => record.id} // Use a unique key for each row
      />
    </div>
  );
};

export default Artist;
