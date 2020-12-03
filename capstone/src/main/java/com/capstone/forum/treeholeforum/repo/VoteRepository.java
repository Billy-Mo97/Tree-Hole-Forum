package com.capstone.forum.treeholeforum.repo;
import com.capstone.forum.treeholeforum.model.Moment;
import com.capstone.forum.treeholeforum.model.User;
import com.capstone.forum.treeholeforum.model.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;

public interface VoteRepository extends JpaRepository<Vote, Long>{
    Optional<Vote> findTopByPostAndUserOrderByVoteIdDesc (Moment moment, User user);
}
