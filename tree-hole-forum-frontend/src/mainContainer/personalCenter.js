import React from 'react';
import {
    Form,
    Input,
    Button,
    Col,
    Row,
    Menu,
    Card,
    Layout,
    Comment,
    Avatar,
    Tooltip,
    Collapse,
    List,
    Radio,
    message, Popconfirm
} from 'antd';
import {
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined,
    UserOutlined,
    DeleteOutlined,
    LikeOutlined
} from '@ant-design/icons';

import './personalCenter.scss';
import {Content, Footer, Header} from "antd/es/layout/layout";
import {dateFormat} from "../util/util";

export class PersonalCenter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentNav: "1",
            user: JSON.parse(localStorage.getItem("login_token")),
            formRef: React.createRef(),
            totalMoments: []
        }
    }


    componentDidMount() {
        this.state.formRef.current.setFieldsValue({"email": this.state.user.email});
        this.state.formRef.current.setFieldsValue({"sex": this.state.user.sex});
        this.$axios.get('/api/moment/byUser/' + this.state.user.userName).then((res) =>
        {
            let totalMoments = res;
            totalMoments.sort(function (a, b){
                return Date.parse(b.createdTime) - Date.parse(a.createdTime);
            });
            this.setState({
                totalMoments: totalMoments
            });
        });
    }


    handleClick = e => {
        this.setState({
            currentNav: e.key
        });
    }

    confirmPersonalInfo = values => {
        let user = {
            ...this.state.user,
            email: values.email,
            sex: values.sex
        }
        this.$axios.post('/api/users', user).then((res) =>
        {
            message.success("Edit personal information success!");
            localStorage.setItem("login_token", JSON.stringify(user));
            this.setState({
                user: user
            });
        });
    }

    confirmPassword = values => {
        console.log(values.oldPwd);
        console.log(values.cfmPwd);
        if(values.oldPwd === this.state.user.password) {
            let user = {
                ...this.state.user,
                password: values.cfmPwd
            }
            this.$axios.post('/api/users', user).then((res) =>
            {
                alert("Edit password success!");
                localStorage.removeItem("login_token");
                window.location.href = "/login"
            });
        } else {
            message.error("Your old password is wrong, Please check it!");
        }
    }

    confirmDeleteMoment = moment => {
        console.log(moment.id);
        this.$axios.delete('/api/moment/' + moment.id).then((res) =>
        {
            let totalMoments = this.state.totalMoments;
            let index = totalMoments.findIndex(entry => entry.id = moment.id);
            totalMoments.splice(index, 1);
            message.success("Delete moment success");
            this.setState({
                totalMoments: totalMoments
            });
        });
    }

    render() {
        const PersonalInfo = () => (
            <div className = "edit-form">
                <Card title="Personal Information" bordered={true} style={{ width: 700, textAlign:'center'}}>
                    <Form
                        onFinish={this.confirmPersonalInfo}
                        ref={this.state.formRef}
                    >
                        <Form.Item
                            name="email"
                            label="E-mail"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                }
                            ]}
                        >
                            <Input defaultValue={this.state.user.email}/>
                        </Form.Item>
                        <Form.Item
                            label="Sex"
                            name="sex"
                        >
                            <Radio.Group defaultValue={this.state.user.sex}>
                                <Radio value="Female">Female</Radio>
                                <Radio value="Male">Male</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Confirm
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        );

        const PasswordInfo = () => (
            <div className = "edit-form">
                <Card title="Edit Password" bordered={true} style={{ width: 700, textAlign:'center'}}>
                    <Form
                        onFinish={this.confirmPassword}
                    >
                        <Form.Item
                            name="oldPwd"
                            label="Old Password"
                            rules={[
                                {
                                    required: true
                                }
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            name="newPwd"
                            label="New Password"
                            rules={[
                                {
                                    required: true
                                }
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            name="cfmPwd"
                            label="Confirm New Password"
                            dependencies={['newPwd']}
                            hasFeedback
                            rules={[
                                {
                                    required: true
                                },
                                {
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (!value || getFieldValue('newPwd') === value) {
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
                            <div className="editPwd-btn">
                                <Button type="primary" htmlType="submit">
                                    Confirm
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        );

        const Moment = ({moment, index}) => (
            <div className="userInfo-moment-element">
                <Layout>
                    <Header>
                        <div className="head-topic">
                            <h3 style={{color:'white', width:'100px'}}>{moment.topic}</h3>
                        </div>
                        <div className="del-btn">
                            <Popconfirm
                                title="Are you sure to delete this moment?"
                                onConfirm={() => this.confirmDeleteMoment(moment)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button icon={<DeleteOutlined/>}></Button>
                            </Popconfirm>,
                        </div>
                    </Header>
                    <Content>
                        <Comment
                            avatar={<Avatar icon={<UserOutlined />} />}
                            content={
                                <p>
                                    {moment.contents}
                                </p>
                            }
                            datetime={
                                <Tooltip title={dateFormat('YYYY-MM-DD', new Date(moment.createdTime))}>
                                    <span>{dateFormat('YYYY-MM-DD', new Date(moment.createdTime))}</span>
                                </Tooltip>
                            }
                        />
                        <div className="personal-like-btn">
                            <Button
                                icon={<LikeOutlined />}
                                disabled> {moment.votes.length}</Button>
                        </div>
                    </Content>
                    <Footer>
                        <Collapse>
                            <Collapse.Panel header="Comments">
                                <List
                                    itemLayout="horizontal"
                                    dataSource={moment.comments}
                                    bordered={true}
                                    renderItem={item => (
                                        <List.Item>
                                            <Comment
                                                avatar={<Avatar icon={<UserOutlined />} />}
                                                content={
                                                    <p>
                                                        {item.contents}
                                                    </p>
                                                }
                                                datetime={
                                                    <Tooltip title={dateFormat('YYYY-MM-DD', new Date(item.createdTime))}>
                                                        <span>{dateFormat('YYYY-MM-DD', new Date(item.createdTime))}</span>
                                                    </Tooltip>
                                                }
                                            />
                                        </List.Item>
                                    )}
                                >
                                </List>
                            </Collapse.Panel>
                        </Collapse>
                    </Footer>
                </Layout>
            </div>
        );


        return (
            <div className="forum-body">
                <Row>
                    <Col span={4}>
                        <Menu onClick={this.handleClick} mode="vertical" theme="dark">
                            <Menu.Item key="1">Personal Information</Menu.Item>
                            <Menu.Item key="2">Edit Password</Menu.Item>
                            <Menu.Item key="3">My Moments</Menu.Item>
                        </Menu>
                    </Col>
                    <Col span={20}>
                            {
                                this.state.currentNav === "1" ? <PersonalInfo/> : this.state.currentNav === "2"
                                    ? <PasswordInfo/>
                                    :
                                    (this.state.totalMoments.map((moment,index) => {
                                        return (
                                            <Moment moment={moment} index={index}/>
                                        );
                                    }))
                            }
                    </Col>
                </Row>
            </div>
        );
    }

};