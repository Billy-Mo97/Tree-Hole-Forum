import React from 'react';
import {Col, Row, Menu, Table, Button, Switch, message, Popconfirm, Alert} from 'antd';
import {MailOutlined, AppstoreOutlined, SettingOutlined, UserOutlined, DeleteOutlined} from '@ant-design/icons';

import './personalCenter.scss';
import {Content, Footer, Header} from "antd/es/layout/layout";
import './manageCenter.scss'
import {dateFormat} from "../util/util";

const { Column } = Table;

export class ManageCenter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentNav: "1",
            user: JSON.parse(localStorage.getItem("login_token")),
            totalUsers: [],
            totalMoments: []
        }
    }


    componentDidMount() {
        this.$axios.get('/api/users').then((users) =>
        {

            let totalUsers = users;
            this.$axios.get('/api/moment').then((moments) =>
            {

                let totalMoments = moments;
                totalMoments.sort(function (a, b){
                    return Date.parse(b.createdTime) - Date.parse(a.createdTime);
                });
                totalMoments = totalMoments.map(moment => {
                    return {
                        ...moment,
                        createdTime: dateFormat('YYYY-MM-DD', new Date(moment.createdTime))
                    }
                })
                this.setState({
                    totalUsers: totalUsers.filter(user => user.id !== this.state.user.id),
                    totalMoments: totalMoments
                });
            });
        });
    }


    handleClick = e => {
        this.setState({
            currentNav: e.key
        });
    }

    changeAuthority = (e, id) => {
        let authority = e ? "Manager" : "Normal";
        let userIndex = this.state.totalUsers.findIndex(entry => entry.id === id);
        let newUser = {
            ...this.state.totalUsers[userIndex],
            authority: authority
        }
        this.$axios.post('/api/users', newUser).then((res) =>
        {
            message.success("Edit user authority success!");
            localStorage.setItem("login_token", JSON.stringify(newUser));
            let totalUsers = this.state.totalUsers;
            totalUsers[userIndex] = newUser;
            this.setState({
                totalUsers: totalUsers
            });
        });
    }

    confirmDeleteMoment = (momentId) => {
        console.log(momentId);
        this.$axios.delete('/api/moment/' + momentId).then((res) =>
        {
            let totalMoments = this.state.totalMoments;
            let index = totalMoments.findIndex(entry => entry.id = momentId);
            totalMoments.splice(index, 1);
            message.success("Delete moment success");
            this.setState({
                totalMoments: totalMoments
            });
        });
    }

    render() {

        const columnData = data => {
            return data.map((item, index) => {
                let newItem = {
                    key: index + 1,
                    ...item,
                }
                return newItem;
            });
        }


        const UserInformation = () => (
            <div className="userInfo-table">
                <Table dataSource={columnData(this.state.totalUsers)}>
                    <Column title="User Name" dataIndex="userName" key="userName" />
                    <Column title="Email" dataIndex="email" key="email" />
                    <Column title="Sex" dataIndex="sex" key="sex" />
                    <Column
                        title="Authority"
                        key="operation"
                        render={(text, record) => (
                            <Switch checkedChildren="Manager"
                                    unCheckedChildren="Normal"
                                    defaultChecked={record.authority === "Manager"}
                                    onChange={e =>this.changeAuthority(e, record.id)}/>
                        )}
                    />
                </Table>
            </div>
        );

        const MomentInformation = () => (
            <div className="userInfo-table">
                <Table dataSource={columnData(this.state.totalMoments)}>
                    <Column title="Moment Topic" dataIndex="topic" key="topic" />
                    <Column title="Moment Contents" dataIndex="contents" key="contents" />
                    <Column title="Created User" dataIndex="createdUser" key="createdUser" />
                    <Column title="Poster" dataIndex="createdUser" key="createdUser" />
                    <Column title="Created Time" dataIndex="createdTime" key="createdTime" />
                    <Column
                        title="Operation"
                        key="operation"
                        render={(text, record) => (
                            <Popconfirm
                                title="Are you sure to delete this moment?"
                                onConfirm={() => this.confirmDeleteMoment(record.id)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button icon={<DeleteOutlined/>}></Button>
                            </Popconfirm>
                        )}
                    />
                </Table>
            </div>
        );

        return (
            <div className="forum-body">
                <Row>
                    <Col span={4}>
                        <Menu onClick={this.handleClick} style={{height: '100%'}} mode="vertical" theme="dark">
                            <Menu.Item key="1">User Information</Menu.Item>
                            <Menu.Item key="2">Moments Information</Menu.Item>
                        </Menu>
                    </Col>
                    <Col span={20}>
                        {
                            this.state.user.authority !== "Manager" ? <div className="alert-permission">
                                    <Alert
                                        message="You do not have the permission to enter this page!"
                                        type="error" />
                                </div> :
                                this.state.currentNav === "1" ? <UserInformation/> : <MomentInformation/>
                        }
                    </Col>
                </Row>
            </div>
        );
    }

};