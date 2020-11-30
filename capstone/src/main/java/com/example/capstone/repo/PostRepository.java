package com.example.capstone.repo;

import com.example.capstone.model.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllBySubMoment(SubMoment subMoment);

    List<Post> findByUser(User user);
}
