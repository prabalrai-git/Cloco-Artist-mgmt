import React from "react";
import { Form, Input, Button, DatePicker, Select, InputNumber } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateArtist = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Artist Data:", values);
    // Here you would typically send the form data to your API
    navigate("/artists"); // Navigate back to artists page after submission
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1>Create New Artist</h1>
        <Button
          onClick={() => navigate("/artists")}
          style={{ marginBottom: "16px" }}
        >
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
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter the artist name!" }]}
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
        <Form.Item name="first_release_year" label="First Release Year">
          <InputNumber min={1900} max={new Date().getFullYear()} />
        </Form.Item>
        <Form.Item
          name="no_of_albums_released"
          label="Number of Albums Released"
        >
          <InputNumber min={0} />
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

export default CreateArtist;
