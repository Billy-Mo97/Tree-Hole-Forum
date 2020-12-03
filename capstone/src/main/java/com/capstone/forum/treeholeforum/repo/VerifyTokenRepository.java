package com.capstone.forum.treeholeforum.repo;

import com.capstone.forum.treeholeforum.model.VerifyToken;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;
public interface VerifyTokenRepository extends JpaRepository<VerifyToken, Long> {
    Optional<VerifyToken> findByToken(String token);
}
