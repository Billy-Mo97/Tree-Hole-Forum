package com.capstone.forum.treeholeforum.repo;

import com.capstone.forum.treeholeforum.model.Moment;
import com.capstone.forum.treeholeforum.model.SubMoment;
import com.capstone.forum.treeholeforum.model.User;
import com.example.capstone.model.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Moment, Long> {
    List<Moment> findAllBySubMoment(SubMoment subMoment);

    List<Moment> findByUser(User user);
}
