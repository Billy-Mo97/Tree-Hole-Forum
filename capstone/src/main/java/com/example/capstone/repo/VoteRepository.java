package com.example.capstone.repo;
import com.example.capstone.model.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;

public interface VoteRepository extends JpaRepository<Vote, Long>{
    Optional<Vote> findTopByPostAndUserOrderByVoteIdDesc (Post post, User user);
}
