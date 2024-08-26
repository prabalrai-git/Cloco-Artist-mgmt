import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { Form, Input, Button, Typography, notification } from "antd";
import { setUser } from "../slices/authSlice";
import { loginUser } from "../api/authServices";

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate, isLoading } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      dispatch(setUser({ user: data.user, token: data.token }));
      navigate("/artists"); // Redirect to home page on successful login
    },
    onError: (error) => {
      notification.error({
        message: "Login Failed",
        description: error.message,
      });
    },
  });

  const handleFinish = (values) => {
    mutate({ email: values.email, password: values.password });
  };

  return (
    <div
      className="login-container min-h-screen flex flex-col justify-center "
      style={{
        padding: "24px",
        maxWidth: "400px",
        margin: "auto auto",
      }}
    >
      <Title level={2}>Login</Title>
      <Form onFinish={handleFinish} layout="vertical">
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <div className="flex justify-end my-5 underline">
          <Link to={"/register"}>Register Here</Link>
        </div>
        <Form.Item>
          <Button
            className="w-full"
            type="primary"
            htmlType="submit"
            loading={isLoading}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
