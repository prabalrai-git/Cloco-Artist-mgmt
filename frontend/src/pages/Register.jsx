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
    };
    mutate(dataToPost);
  };

  return (
    <div
      className="login-container"
      style={{ padding: "24px", maxWidth: "600px", margin: "0 auto" }}
    >
      <div className="flex justify-between">
        <Title level={2}>Register</Title>
        <Link to={"/login"}>Back</Link>
      </div>
      <Form onFinish={handleFinish} layout="vertical">
        <Form.Item
          name="first_name"
          label="First Name"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item
          name="last_name"
          label="Last Name"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input placeholder="Last Name" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input placeholder="Email" />
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
          label="Confirm Password"
          name={"password_confirm"}
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
          name="address"
          label="Address"
          rules={[{ required: true, message: "Please enter the address!" }]}
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
