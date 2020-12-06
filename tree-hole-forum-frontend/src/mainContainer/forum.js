import React from 'react';
import { Input, Button, Col, Row, Layout, List, Avatar,
    Comment, Tooltip, Collapse, Modal, Form, Menu, Select, Popconfirm, message, Typography} from 'antd';
import {Content, Footer, Header} from "antd/es/layout/layout";
import './forum.scss';
import {UserOutlined, DeleteOutlined, LikeOutlined} from "@ant-design/icons";
import {dateFormat} from "../util/util";

export class Forum extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            totalMoments: [],
            currentTopic: "View All",
            user: JSON.parse(localStorage.getItem("login_token"))
        }
    }

    componentWillMount() {
        this.$axios.get('/api/moment').then((res) =>
        {
            let totalMoments = res;
            totalMoments.sort(function (a, b){
                return Date.parse(b.createdTime) - Date.parse(a.createdTime);
            });
            totalMoments = totalMoments.map(moment => {
                return {
                    ...moment,
                    like: (moment.votes.findIndex(vote => vote.userId == this.state.user.id) !== -1)
                }
            })
            this.setState({
                totalMoments: totalMoments
            });
        });
    }

    publishMoment = e => {
        let moment = {
            createdUser: this.state.user.userName,
            topic: e.topic,
            contents: e.contents,
            createdTime: dateFormat("YYYY-MM-DD", new Date()),
            comments: []
        }
        this.$axios.post('/api/moment', moment).then((res) =>
        {
            window.location.reload();
        });
    };


    handleNewComment = (values, id) => {
        let moments = this.state.totalMoments
        let index = moments.findIndex(moment => moment.id === id);
        let moment = moments[index];
        let comment = {
            createdUser: this.state.user.userName,
            createdTime: dateFormat("YYYY-MM-DD", new Date()),
            contents:values.newComment,
            momentId: moment.id,
        };
        this.$axios.post('/api/comment', comment).then((res) =>
        {
            window.location.reload();
        });
    }

    changeTopic = topic => {
        this.setState({
            currentTopic: topic
        })
    }

    confirmDeleteMoment = (moment) => {
        console.log(moment.id);
        this.$axios.delete('/api/moment/' + moment.id).then((res) =>
        {
            message.success("Delete moment success");
            window.location.reload();
        });
    }

    confirmDeleteComment = (comment) => {
        console.log(comment);
        this.$axios.delete('/api/comment/' + comment.id).then((res) =>
        {
            message.success("Delete comment success");
            window.location.reload();
        });
    }

    likeMoment = (moment) => {
        if(moment.like) {
            let voteIndex = moment.votes.findIndex(
                entry => entry.momentId == moment.id && entry.userId == this.state.user.id);
            this.$axios.delete('/api/vote/' + moment.votes[voteIndex].id).then((res) =>
            {
                let totalMoments = this.state.totalMoments;
                let newMoment = moment;
                let momentIndex = totalMoments.findIndex(momentEntry => momentEntry.id === moment.id);
                newMoment.votes.splice(voteIndex, 1);
                newMoment.like = !newMoment.like;
                totalMoments[momentIndex] = newMoment;
                this.setState({
                    totalMoments: totalMoments
                });
            });
        } else {
            let newVote = {
                momentId: moment.id,
                userId: this.state.user.id
            };
            this.$axios.post('/api/vote', newVote).then((res) =>
            {
                let totalMoments = this.state.totalMoments;
                let newMoment = moment;
                newMoment.votes.push(res);
                let momentIndex = totalMoments.findIndex(momentEntry => momentEntry.id === moment.id);
                newMoment.like = !newMoment.like;
                totalMoments[momentIndex] = newMoment;
                this.setState({
                    totalMoments: totalMoments
                });
            });
        }
    }

    render() {
        const Moment = ({moment, index}) => (
            <div className="moment-element">
                <Layout>
                    <Header>
                        <div className="head-topic">
                            <h3 style={{color:'white', width:'100px'}}>{moment.topic}</h3>
                        </div>
                        {
                            (this.state.user.userName === moment.createdUser) ? <div className="del-btn">
                                <Popconfirm
                                    title="Are you sure to delete this moment?"
                                    onConfirm={() => this.confirmDeleteMoment(moment)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button icon={<DeleteOutlined/>}></Button>
                                </Popconfirm>,
                            </div> : null
                        }
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
                        <div className="like-btn">
                            <Button
                                icon={<LikeOutlined />}
                                style={{color: (moment.like ? 'red' : 'black')}}
                                onClick={() => this.likeMoment(moment)}> {moment.votes.length}</Button>
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
                                            {
                                                (this.state.user.userName === item.createdUser) ? <div className="moment-del-btn">
                                                    <Popconfirm
                                                        title="Are you sure to delete this comment?"
                                                        onConfirm={() => this.confirmDeleteComment(item)}
                                                        okText="Yes"
                                                        cancelText="No"
                                                    >
                                                        <Button icon={<DeleteOutlined/>}></Button>
                                                    </Popconfirm>
                                                </div> : null
                                            }
                                        </List.Item>
                                    )}
                                >
                                </List>
                                <Form
                                    onFinish={e => this.handleNewComment(e, moment.id)}
                                >
                                    <Form.Item
                                        name="newComment"
                                    >
                                        <div className="comment-edit">
                                            <Input.TextArea rows={4}></Input.TextArea>
                                        </div>
                                    </Form.Item>
                                    <Form.Item>
                                        <div className="comment-btn">
                                            <Button type="primary" htmlType="submit">Publish Comment</Button>
                                        </div>
                                    </Form.Item>
                                </Form>
                            </Collapse.Panel>
                        </Collapse>
                    </Footer>
                </Layout>
            </div>
        );

        const selectTopic = e => {
            //alert(e.key);
            switch (e.key) {
                case "DL": formRef.current.setFieldsValue({"topic": "Daily Lives"}); break;
                case "C19": formRef.current.setFieldsValue({"topic": "Covid-19"}); break;
                case "FL": formRef.current.setFieldsValue({"topic": "Feelings"}); break;
                case "OT": formRef.current.setFieldsValue({"topic": "Other"}); break;
            }
        }

        let formRef = React.createRef()

        const AddMomentElement = ({}) => (
            <div className="publish-element">
                <Layout>
                    <Content>
                        <Typography.Title level={5}>
                            Welcome to the tree, in here you can share you feelings and stories by publishing moments.
                        </Typography.Title>
                    </Content>
                    <Footer>
                        <div className="publish-button">
                            <Collapse>
                                <Collapse.Panel header="Publish a moment">
                                    <Form
                                        ref={formRef}
                                        onFinish={e => this.publishMoment(e)}
                                    >
                                        <Form.Item
                                            name="topic"
                                        >
                                            <Menu onSelect={selectTopic}>
                                                <Menu.Item key="DL">
                                                    <a target="_blank" rel="noopener noreferrer">
                                                        Daily Lives
                                                    </a>
                                                </Menu.Item>
                                                <Menu.Item key="C19">
                                                    <a target="_blank" rel="noopener noreferrer">
                                                        Covid-19
                                                    </a>
                                                </Menu.Item>
                                                <Menu.Item key="FL">
                                                    <a target="_blank" rel="noopener noreferrer">
                                                        Feelings
                                                    </a>
                                                </Menu.Item>
                                                <Menu.Item key="OT">
                                                    <a target="_blank" rel="noopener noreferrer">
                                                        Other
                                                    </a>
                                                </Menu.Item>
                                            </Menu>
                                        </Form.Item>
                                        <Form.Item
                                            name="contents"
                                        >
                                            <div className="comment-edit">
                                                <Input.TextArea rows={4}></Input.TextArea>
                                            </div>
                                        </Form.Item>
                                        <Form.Item>
                                            <div className="comment-btn">
                                                <Button type="primary" htmlType="submit">Publish</Button>
                                            </div>
                                        </Form.Item>
                                    </Form>
                                </Collapse.Panel>
                            </Collapse>
                        </div>
                    </Footer>
                </Layout>
            </div>
        );

        const ChooseTopicElement = ({}) => (
          <div className="topic-element">
              <List
                  itemLayout="horizontal"
                  dataSource={["Daily Lives", "Covid-19", "Feelings", "Other", "View All"]}
                  bordered={true}
                  renderItem={item => (
                      <List.Item>
                          <Button type="link" onClick={e => this.changeTopic(item)}>{item}</Button>
                      </List.Item>
                  )}
              >
              </List>
          </div>
        );
        let currentMoments = this.state.currentTopic === "View All" ? this.state.totalMoments
            : this.state.totalMoments.filter(moment => moment.topic === this.state.currentTopic);
        return (
            <div>
                <Row>
                    <Col span={16}>
                        {
                            (currentMoments.map((moment,index) => {
                                return (
                                  <Moment moment={moment} index={index}/>
                                );
                            }))
                        }
                    </Col>
                    <Col span={8}>
                        <AddMomentElement/>
                        <ChooseTopicElement/>
                    </Col>
                </Row>
            </div>
        );
    }

};