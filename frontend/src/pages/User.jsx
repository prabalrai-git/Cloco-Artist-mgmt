import React from "react";
import { Button, message, Table } from "antd";
import { dummyUsers } from "../data/dummyData";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUser, getUsersList } from "../api/userServices";

const User = () => {
  const columns = [
    { title: "First Name", dataIndex: "first_name", key: "first_name" },
    { title: "Last Name", dataIndex: "last_name", key: "last_name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    {
      title: "DOB",
      dataIndex: "dob",
      key: "dob",
      render: (text, record) => <p>{text.split("T")[0]}</p>,
    },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    { title: "Address", dataIndex: "address", key: "address" },
    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-5">
            <Button>Edit</Button>
            <Button onClick={() => onDelete(record.id)} danger>
              Delete
            </Button>
          </div>
        );
      },
    },
  ];
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (id) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      message.success("User deleted successfully.");
    },
    onError: (err) => {
      message.error(err.message ? err.message : "Error deleting user");
    },
  });

  const onDelete = (id) => {
    mutate(id);
  };

  const navigate = useNavigate();

  const { data, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUsersList,
  });

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
        dataSource={data?.users}
        rowKey={(record) => record.email} // Use a unique key for each row
      />
    </div>
  );
};

export default User;
