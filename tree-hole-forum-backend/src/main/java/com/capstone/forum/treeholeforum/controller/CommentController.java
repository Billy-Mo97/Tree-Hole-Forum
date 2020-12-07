package com.capstone.forum.treeholeforum.controller;

import com.capstone.forum.treeholeforum.model.Comment;
import com.capstone.forum.treeholeforum.repository.CommentRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/comment")
public class CommentController {
    private CommentRepository commentRepository;

    public CommentController(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @GetMapping
    public List<Comment> getList() {
        return commentRepository.findAll();
    }

    @PostMapping
    public Comment addComment(@RequestBody Comment comment) {
        comment.setCreatedTime(new Date());
        return commentRepository.save(comment);
    }

    @DeleteMapping(value = "/{uid}")
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
