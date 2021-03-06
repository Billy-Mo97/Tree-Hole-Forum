package com.capstone.forum.treeholeforum.dao;

import com.capstone.forum.treeholeforum.model.Comment;
import com.capstone.forum.treeholeforum.model.Vote;
import lombok.Data;

import java.util.Date;
import java.util.List;

//Definition for Moment temp class
@Data
public class MomentDto {

    private String id;

    private String contents;

    private Date createdTime;

    private String createdUser;

    private String topic;

    private List<Comment> comments;

    private List<Vote> votes;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getContents() {
        return contents;
    }

    public void setContents(String contents) {
        this.contents = contents;
    }

    public Date getCreatedTime() {
        return createdTime;
    }

    public List<Vote> getVotes() {
        return votes;
    }

    public void setVotes(List<Vote> votes) {
        this.votes = votes;
    }

    public void setCreatedTime(Date createdTime) {
        this.createdTime = createdTime;
    }

    public String getCreatedUser() {
        return createdUser;
    }

    public void setCreatedUser(String createdUser) {
        this.createdUser = createdUser;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }
}
