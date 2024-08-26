import { Form, Input, Button, Select, message } from "antd";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMusic, updateMusic } from "../api/musicServices";
import { useEffect } from "react";

const { Option } = Select;

const CreateSong = () => {
  const [params, setParams] = useSearchParams();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const location = useLocation();

  const toEditData = location.state;
  console.log(toEditData);
  const [form] = Form.useForm();

  const { mutate } = useMutation({
    mutationFn: addMusic,
    onSuccess: () => {
      queryClient.invalidateQueries("songs");
      message.success("Song added successfully.");
      history.back();
    },
    onError: (err) => {
      message.error(err.message ? err.message : "Error adding song");
    },
  });

  const { mutate: updateMutate } = useMutation({
    mutationFn: ({ id, data }) => updateMusic(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries("songs");
      message.success("Song updated successfully.");
      history.back();
    },
    onError: (err) => {
      message.error(err.message ? err.message : "Error updating song");
    },
  });
  useEffect(() => {
    if (toEditData) {
      form.setFieldsValue({
        ...toEditData, // Spread toEditData to match form fields
      });
    }
  }, [toEditData, form]);

  const onFinish = (values) => {
    if (toEditData) {
      // Pass id and data as a single object
      updateMutate({
        id: toEditData?.id,
        data: { ...values, artist_id: toEditData?.artist_id },
      });
    } else {
      mutate({
        ...values,
        artist_id: params.get("artist_id"),
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1>{toEditData ? "Edit song" : "Add a song"}</h1>
        <Button onClick={() => history.back()} style={{ marginBottom: "16px" }}>
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
            {toEditData ? "Edit Song" : "Submit"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateSong;
