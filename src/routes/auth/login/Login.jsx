import { Button, Checkbox, Form, Input, Typography, notification } from "antd";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { useLoginMutation } from "../../../redux/api/authApi";
import { login } from "../../../redux/slices/authSlice";

const { Title, Text } = Typography;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loginRequest, { data, error, isLoading, isSuccess, isError }] = useLoginMutation();

  const onFinish = async (values) => {
    try {
      await loginRequest(values);
    } catch (error) {
      console.error("Login request failed:", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(login({ token: data?.payload?.token, username: data?.payload?.user.username }));
      notification.success({
        message: "Successfully logged in! 😊",
        description: "Welcome back! You are being redirected to the dashboard.",
        placement: "topRight",
      });
      navigate("/dashboard");
    }

    if (isError) {
      if (error.status === 403) {
        notification.error({
          message: "Login Failed",
          description: "You don't have permission to access this resource (403).",
          placement: "topRight",
        });
      } else {
        notification.error({
          message: "Login Error",
          description: error?.data?.message || "An unknown error occurred.",
          placement: "topRight",
        });
      }
    }
  }, [isSuccess, isError, error, data, dispatch, navigate]);

  const onFinishFailed = (errorInfo) => {
    notification.error({
      message: "Login Failed",
      description: "Please check your inputs and try again.",
      placement: "topRight",
    });
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 24 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Title className="text-center">Login</Title>
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ span: 24 }}>
        <Button className="w-full" type="primary" htmlType="submit" loading={isLoading}>Login</Button>
      </Form.Item>

      <Text className="text-center mt-[16px] block">
        Don't have an account? <Link to="/auth/register">Register</Link>
      </Text>
    </Form>
  );
};

export default Login;