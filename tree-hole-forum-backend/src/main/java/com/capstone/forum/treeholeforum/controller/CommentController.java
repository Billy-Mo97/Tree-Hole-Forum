package com.capstone.forum.treeholeforum.controller;


import com.capstone.forum.treeholeforum.dao.LoginRequest;
import com.capstone.forum.treeholeforum.model.Comment;
import com.capstone.forum.treeholeforum.model.Moment;
import com.capstone.forum.treeholeforum.model.User;
import com.capstone.forum.treeholeforum.repository.CommentRepository;
import com.capstone.forum.treeholeforum.repository.MomentRepository;
import com.capstone.forum.treeholeforum.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/comment")
public class CommentController {
    private CommentRepository commentRepository;

    public CommentController(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @GetMapping//查
    public List<Comment> getList() {
        return commentRepository.findAll();
    }

    @PostMapping//改和增
    public Comment addComment(@RequestBody Comment comment) {
        comment.setCreatedTime(new Date());
        return commentRepository.save(comment);
    }

    @DeleteMapping(value = "/{uid}")//删
    public void delComment(@PathVariable("uid") Long uid
    ) {
        commentRepository.deleteById(uid);
    }

    @GetMapping(value = "/byMomentId/{momentId}")
    public List<Comment> getByMomentId(@PathVariable("momentId") String momentId) {
        List<Comment> comments = commentRepository.findByMomentId(momentId);
        return comments;
    }
}
