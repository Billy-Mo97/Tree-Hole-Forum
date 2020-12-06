package com.capstone.forum.treeholeforum.controller;

import com.capstone.forum.treeholeforum.model.Comment;
import com.capstone.forum.treeholeforum.model.Vote;
import com.capstone.forum.treeholeforum.repository.CommentRepository;
import com.capstone.forum.treeholeforum.repository.VoteRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/vote")
public class VoteController {
    private VoteRepository voteRepository;

    public VoteController(VoteRepository voteRepository) {
        this.voteRepository = voteRepository;
    }

    @GetMapping//查
    public List<Vote> getList() {
        return voteRepository.findAll();
    }

    @PostMapping//改和增
    public Vote addVote(@RequestBody Vote vote) {
        return voteRepository.save(vote);
    }

    @DeleteMapping(value = "/{uid}")//删
    public void delVote(@PathVariable("uid") Long uid
    ) {
       voteRepository.deleteById(uid);
    }

    @GetMapping(value = "/byMomentId/{momentId}")
    public List<Vote> getByMomentId(@PathVariable("momentId") String momentId) {
        List<Vote> votes = voteRepository.findByMomentId(momentId);
        return votes;
    }
}
