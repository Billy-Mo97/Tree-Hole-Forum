package com.capstone.forum.treeholeforum.repo;

import com.capstone.forum.treeholeforum.model.Comment;
import com.capstone.forum.treeholeforum.model.Moment;
import com.capstone.forum.treeholeforum.model.User;
import com.example.capstone.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface CommentRepository extends JpaRepository<Comment, Long>{

    List<Comment> findAllByUser(User user);
    List<Comment> findByPost(Moment moment);
}
