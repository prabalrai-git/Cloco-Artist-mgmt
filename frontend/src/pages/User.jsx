import React from "react";
import { Button, Table } from "antd";
import { dummyUsers } from "../data/dummyData";
import { useNavigate } from "react-router-dom";

const User = () => {
  const columns = [
    { title: "First Name", dataIndex: "first_name", key: "first_name" },
    { title: "Last Name", dataIndex: "last_name", key: "last_name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "DOB", dataIndex: "dob", key: "dob" },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    { title: "Address", dataIndex: "address", key: "address" },
  ];

  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1>Users</h1>
        <Button
          onClick={() => navigate("/users/create")}
          type="primary"
          style={{ marginBottom: "16px" }}
        >
          Create New User
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={dummyUsers}
        rowKey={(record) => record.email} // Use a unique key for each row
      />
    </div>
  );
};

export default User;
