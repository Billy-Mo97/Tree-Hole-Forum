import React from 'react';
import { PageHeader, Avatar, Button, Menu, Dropdown, Space} from "antd";
import { UserOutlined, CommentOutlined, ProfileOutlined} from '@ant-design/icons';
import {Forum} from './forum';
import {PersonalCenter} from "./personalCenter";
import {ManageCenter} from "./manageCenter";
import './main.scss';
import { withRouter } from 'react-router';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            content: "Forum"
        }
    }

    componentWillMount() {
        let token = localStorage.getItem("login_token");
        if(!token) {
            alert("Please log in!")
            this.props.history.push({ pathname: "/login"});
        }
    }

    changePage = (value) => {
        this.setState({
            content: value
        });
    }

    logOut = () => {
        console.log("111");
        localStorage.removeItem("login_token");
        window.location.href = "/";
    }

    render() {
        const menu = (
            <Menu>
                <Menu.Item key="1">
                    <Button type="link" onClick={this.logOut}>Log out</Button>
                </Menu.Item>
            </Menu>
        );

        return (
            <div className="forum-body">
                <PageHeader
                    className="site-page-header"
                    title="Tree Hole"
                    style={{backgroundColor: '#F8F8FF'}}
                    extra={[
                        <Space size="large">
                            <Button type="primary" icon={<CommentOutlined/>} onClick={()=>this.changePage("Forum")}>Forum</Button>
                            <Button type="primary" icon={<UserOutlined/>} onClick={()=>this.changePage("PC")}>Person Center</Button>
                            <Button type="primary" icon={<ProfileOutlined/>} onClick={()=>this.changePage("MC")}>Manage Center</Button>
                            <Dropdown overlay={menu} placement="bottomLeft">
                                <Avatar icon={<UserOutlined />} />
                            </Dropdown>
                        </Space>
                    ]}
                />
                <div>
                    {(()=>{
                            switch(this.state.content){
                                case "Forum":return <Forum/>; break;
                                case "PC":return <PersonalCenter/>; break;
                                case "MC":return <ManageCenter/>; break;
                                default:return null;
                            }
                        }
                    )()}
                </div>
            </div>
        );
    }

};

export default withRouter(Main);