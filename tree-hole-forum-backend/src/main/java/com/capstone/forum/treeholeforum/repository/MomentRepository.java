package com.capstone.forum.treeholeforum.repository;

import com.capstone.forum.treeholeforum.model.Moment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MomentRepository extends JpaRepository<Moment, Long> {
    List<Moment> findByCreatedUser(String createdUser);
}
