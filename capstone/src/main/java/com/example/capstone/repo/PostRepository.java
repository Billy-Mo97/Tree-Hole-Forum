package com.example.capstone.repo;

import com.example.capstone.model.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Moment, Long> {
    List<Moment> findAllBySubMoment(SubMoment subMoment);

    List<Moment> findByUser(User user);
}
