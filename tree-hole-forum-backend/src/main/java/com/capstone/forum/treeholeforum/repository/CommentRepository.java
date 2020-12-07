package com.capstone.forum.treeholeforum.repository;

import com.capstone.forum.treeholeforum.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByMomentId(String momentId);
}
