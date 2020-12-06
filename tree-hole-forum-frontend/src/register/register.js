import React from 'react';
import {
    Button,
    Card,
    Form,
    Input,
    Radio,
    message
} from 'antd';
import './register.scss';
import {UserOutlined} from "@ant-design/icons";

export class Register extends React.Component {
    constructor(props) {
        super(props);

    }

    backToLogin = () => {
        window.location.href = "/";
    }

    onFinish = values => {
        console.log(values);
        this.$axios.post('/api/users/login', values).then((res) =>
        {
            if(res.userName) {
                message.error("Current userName already exists!")
            } else {
                values.authority = "Normal";
                this.$axios.post('/api/users', values).then((res) =>
                {
                    alert("Register success!");
                    window.location.href = "/";
                });
            }
        });
    }

    render() {

        const formItemLayout = {
            labelCol: {
                xs: {
                    span: 24,
                },
                sm: {
                    span: 8,
                },
            },
            wrapperCol: {
                xs: {
                    span: 24,
                },
                sm: {
                    span: 16,
                },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        let formRef = React.createRef();

        return (
            <div className="register-form">
                <Card title="Resister Form" bordered={true} style={{ width: 700, textAlign:'center'}}>
                    <Form
                        {...formItemLayout}
                        ref={formRef}
                        name="register"
                        onFinish={this.onFinish}
                        scrollToFirstError
                    >
                        <Form.Item
                            label="UserName"
                            name="userName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="E-mail"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Sex"
                            name="sex"
                            rules={[{
                                required: true
                            }]}
                        >
                            <Radio.Group>
                                <Radio value="Female">Female</Radio>
                                <Radio value="Male">Male</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }

                                        return Promise.reject('The two passwords that you entered do not match!');
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item>
                            <div className="register-btn">
                                <Button type="primary" htmlType="submit">Confirm</Button>
                                <div className="next-btn">
                                    <Button onClick={this.backToLogin}>Back</Button>
                                </div>

                            </div>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        );
    }

};