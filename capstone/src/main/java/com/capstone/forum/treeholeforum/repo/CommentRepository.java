package com.capstone.forum.treeholeforum.repo;

import com.capstone.forum.treeholeforum.model.Comment;
import com.capstone.forum.treeholeforum.model.Moment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByMomentId(String momentId);
}
