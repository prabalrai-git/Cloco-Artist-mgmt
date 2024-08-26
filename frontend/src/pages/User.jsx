import { Button, message, Popconfirm, Table, Tag, Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUser, getUsersList } from "../api/userServices";
import { useSelector } from "react-redux";
import usePermissions from "../hooks/usePermissions";
import { useState } from "react";

const User = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const permissions = usePermissions(user.role.role);

  const columns = [
    { title: "First Name", dataIndex: "first_name", key: "first_name" },
    { title: "Last Name", dataIndex: "last_name", key: "last_name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
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
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text) => (
        <Tag color="green" className="uppercase">
          {text === "admin" ? "system_admin" : text}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-5">
            {permissions.user.Update && (
              <Button
                onClick={() => navigate("/users/create", { state: record })}
              >
                Edit
              </Button>
            )}
            {permissions.user.Delete && (
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
        );
      },
    },
  ];

  const { mutate } = useMutation({
    mutationFn: (id) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["users", page, pageSize]);
      message.success("User deleted successfully.");
    },
    onError: (err) => {
      message.error(err.message ? err.message : "Error deleting user");
    },
  });

  const onDelete = (id) => {
    mutate(id);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["users", page, pageSize],
    queryFn: () => getUsersList(page, pageSize),
    keepPreviousData: true, // Keep previous data while fetching new data
  });

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
      <div className=" flex flex-row xsm:flex-col md:flex-row  justify-between items-center  ">
        <h1>Users</h1>
        {permissions.user.Create && (
          <Button
            onClick={() => navigate("/users/create")}
            type="primary"
            style={{ marginBottom: "16px" }}
          >
            Create New User
          </Button>
        )}
      </div>
      <Table
        columns={columns}
        scroll={{ x: 400 }}
        dataSource={data?.users}
        rowKey={(record) => record.email} // Use a unique key for each row
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

export default User;
