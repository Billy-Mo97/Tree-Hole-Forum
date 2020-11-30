package com.example.capstone.repo;

import com.example.capstone.model.SubMoment;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SubMomentRepository extends JpaRepository<SubMoment, Long> {
    Optional<SubMoment> findByName(String subMomentName);
}
