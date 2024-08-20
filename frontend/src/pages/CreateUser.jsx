import React from "react";
import { Form, Input, Button, DatePicker, Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateUser = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("User Data:", values);
    // Here you would typically send the form data to your API
    navigate("/users"); // Navigate back to users page after submission
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
          name="phone"
          label="Phone"
          rules={[
            { required: true, message: "Please enter the phone number!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="dob" label="Date of Birth">
          <DatePicker />
        </Form.Item>
        <Form.Item name="gender" label="Gender">
          <Select>
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>
        <Form.Item name="address" label="Address">
          <Input />
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
