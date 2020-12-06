import React from 'react';
import { Form, Input, Button, Popconfirm, message, Typography} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.scss';
import { withRouter } from 'react-router';

class Login extends React.Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {
        let token = localStorage.getItem("login_token");
        if(token) {
            this.props.history.push({ pathname: "/main"});
            //window.location.href = "/main";
        }
    }

    handleSubmit = (values) => {
        //console.log(values);
        //console.log(this.props);
        this.$axios.post('/api/users/login', values).then((res) =>
        {
            if(res.password) {
                if(res.password === values.password) {
                    localStorage.setItem("login_token", JSON.stringify(res));
                    window.location.href = "/main";
                } else {
                    message.error("Your password is wrong!");
                }
            } else {
                message.error("Your userName is wrong!");
            }
        });
    }

    render() {
        return (
            <div>
                <Typography.Title>Tree Hole Forum</Typography.Title>
                <div className="login-total">
                    <Form
                        name="normal_login"
                        className="login-form"
                        onFinish={this.handleSubmit}
                    >
                        <Form.Item
                            name="userName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            Or <a href="/register">register now!</a>
                        </Form.Item>
                    </Form>
                </div>
            </div>

        );
    }

};

export default withRouter(Login);
