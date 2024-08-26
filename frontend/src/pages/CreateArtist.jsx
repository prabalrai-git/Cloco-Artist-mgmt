import { useEffect } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  InputNumber,
  message,
} from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addArtist, updateArtist } from "../api/artistServices";
import moment from "moment";

const { Option } = Select;

const CreateArtist = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();

  const toEditData = location.state;
  const [form] = Form.useForm();

  const { mutate } = useMutation({
    mutationFn: addArtist,
    onSuccess: () => {
      queryClient.invalidateQueries("artists");
      message.success("Artist created successfully.");
      navigate("/artists");
    },
    onError: (err) => {
      message.error(err.message ? err.message : "Error creating artist");
    },
  });
  const { mutate: updateMutate } = useMutation({
    mutationFn: ({ id, data }) => updateArtist(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      message.success("Artist updated successfully.");
      navigate("/artists");
    },
    onError: (err) => {
      message.error(err.message ? err.message : "Error updating artist");
    },
  });
  useEffect(() => {
    if (toEditData) {
      form.setFieldsValue({
        ...toEditData,
        dob: moment(toEditData.dob), // Convert date string to moment object
      });
    }
  }, [toEditData, form]);

  const onFinish = (values) => {
    const dataToPost = {
      ...values,
      dob: values.dob.toISOString().split("T")[0],
    };

    if (toEditData) {
      // Pass id and data as a single object
      updateMutate({ id: toEditData?.id, data: dataToPost });
    } else {
      mutate(dataToPost);
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1>{toEditData ? "Edit Artist" : "Create New Artist"}</h1>
        <Button
          onClick={() => navigate("/artists")}
          style={{ marginBottom: "16px" }}
        >
          Back
        </Button>
      </div>
      <Form
        form={form}
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
            {toEditData ? "Edit Artist" : "Submit"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateArtist;
