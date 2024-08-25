import React from "react";
import { Form, Input, Button, DatePicker, Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addUser, getRolesList } from "../api/userServices";

const { Option } = Select;

const CreateUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, error } = useQuery({
    queryKey: ["roles"],
    queryFn: getRolesList,
  });

  const { mutate } = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      message.success("User created successfully.");
      navigate("/");
    },
    onError: (err) => {
      message.error(err.message ? err.message : "Error creating user");
    },
  });

  const onFinish = (values) => {
    const dataToPost = {
      ...values,
      dob: values.dob.toISOString().split("T")[0],
    };
    mutate(dataToPost);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1>Create New User</h1>
        <Button onClick={() => navigate("/")} style={{ marginBottom: "16px" }}>
          Back
        </Button>
      </div>
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          gender: "male",
        }}
      >
        <Form.Item
          name="first_name"
          label="First Name"
          rules={[{ required: true, message: "Please enter the first name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="last_name"
          label="Last Name"
          rules={[{ required: true, message: "Please enter the last name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="address" label="Address">
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please enter a valid email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please input your password!" }]}
          hasFeedback
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            { required: true, message: "Please enter the phone number!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="dob"
          label="Date of Birth"
          rules={[{ required: true, message: "Please select DOB!" }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: "Please enter the gender!" }]}
        >
          <Select>
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="role_id"
          label="Role"
          rules={[{ required: true, message: "Please enter the role!" }]}
        >
          <Select>
            {data?.roles?.map((item) => {
              return (
                <Option value={item.id} className="uppercase">
                  {item.role}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateUser;
