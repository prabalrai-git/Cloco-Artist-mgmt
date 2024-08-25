import React from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  InputNumber,
  message,
} from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addArtist } from "../api/artistServices";
import { addMusic } from "../api/musicServices";

const { Option } = Select;

const CreateSong = () => {
  const [params, setParams] = useSearchParams();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addMusic,
    onSuccess: () => {
      queryClient.invalidateQueries("songs");
      message.success("Song added successfully.");
      navigate("/artists");
    },
    onError: (err) => {
      message.error(err.message ? err.message : "Error adding song");
    },
  });

  const onFinish = (values) => {
    const dataToPost = {
      ...values,
      artist_id: params.get("artist_id"),
    };
    mutate(dataToPost);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1>Add a song</h1>
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
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter the title!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="album_name"
          label="Album Name"
          rules={[{ required: true, message: "Please enter the album name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="genre" label="Genre">
          <Select>
            <Option value="rnb">RNB</Option>
            <Option value="country">Country</Option>
            <Option value="classic">Classic</Option>
            <Option value="rock">Rock</Option>
            <Option value="jazz">Jazz</Option>
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

export default CreateSong;
