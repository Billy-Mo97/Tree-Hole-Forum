package com.example.capstone.repo;

import com.example.capstone.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface CommentRepository extends JpaRepository<Comment, Long>{

    List<Comment> findAllByUser(User user);
    List<Comment> findByPost(Moment moment);
}
