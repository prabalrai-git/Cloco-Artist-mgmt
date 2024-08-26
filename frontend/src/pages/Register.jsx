import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import {
  Form,
  Input,
  Button,
  Typography,
  notification,
  DatePicker,
  Select,
} from "antd";
import { RegisterUser } from "../api/authServices";

const { Title } = Typography;
const { Option } = Select;

const Register = () => {
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: RegisterUser,
    onSuccess: () => {
      notification.success({
        message: "Registration Successful",
        description: "A new user has been registered.",
      });
      navigate("/login"); // Redirect to home page on successful login
    },
    onError: (error) => {
      notification.error({
        message: "Register Failed",
        description: error.message,
      });
    },
  });

  const handleFinish = (values) => {
    const dataToPost = {
      ...values,
      dob: values.dob.toISOString().split("T")[0],
      artist_id: null,
    };
    mutate(dataToPost);
  };

  return (
    <div
      className="login-container flex flex-col justify-center h-screen
     "
      style={{ padding: "24px", margin: "0 30%" }}
    >
      <div className="flex justify-between">
        <Title level={2}>Register</Title>
        <Link to={"/login"}>Back</Link>
      </div>
      <Form onFinish={handleFinish} layout="vertical">
        <div className="flex flex-row gap-8 ">
          <Form.Item
            className="flex-1"
            name="first_name"
            label="First Name"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item
            className="flex-1"
            name="last_name"
            label="Last Name"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
        </div>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <div className="flex flex-row gap-8 ">
          <Form.Item
            name="password"
            label="Password"
            className="flex-1"
            rules={[{ required: true, message: "Please input your password!" }]}
            hasFeedback
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name={"password_confirm"}
            className="flex-1"
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
        </div>
        <div className="flex flex-row gap-8 ">
          <Form.Item
            name="address"
            label="Address"
            className="flex-1"
            rules={[{ required: true, message: "Please enter the address!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            className="flex-1"
            label="Phone"
            rules={[
              { required: true, message: "Please enter the phone number!" },
            ]}
          >
            <Input />
          </Form.Item>
        </div>

        <div className="flex flex-row gap-8 ">
          <Form.Item
            name="dob"
            label="Date of Birth"
            className="flex-1"
            rules={[{ required: true, message: "Please select DOB!" }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            className="flex-1"
            rules={[{ required: true, message: "Please enter the gender!" }]}
          >
            <Select>
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item>
          <Button
            className="w-full"
            type="primary"
            htmlType="submit"
            loading={isLoading}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
      {/* {isError && (
        <p style={{ color: "red" }}>Login failed. Please try again.</p>
      )} */}
    </div>
  );
};

export default Register;
