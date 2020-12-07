package com.capstone.forum.treeholeforum.controller;

import com.capstone.forum.treeholeforum.dao.MomentDto;
import com.capstone.forum.treeholeforum.model.Comment;
import com.capstone.forum.treeholeforum.model.Moment;
import com.capstone.forum.treeholeforum.model.Vote;
import com.capstone.forum.treeholeforum.repository.MomentRepository;
import org.springframework.web.bind.annotation.*;
import java.util.*;

import com.capstone.forum.treeholeforum.controller.CommentController;

@RestController
@RequestMapping("/api/moment")
public class MomentController {
    private MomentRepository momentRepository;
    private CommentController commentController;
    private VoteController voteController;


    public MomentController(MomentRepository momentRepository,
                            CommentController commentController,
                            VoteController voteController) {
        this.momentRepository = momentRepository;
        this.commentController = commentController;
        this.voteController = voteController;
    }

    @GetMapping
    public List<MomentDto> getList() {
        List<Moment> moments = momentRepository.findAll();
        return attachMoment(moments);
    }

    @PostMapping
    public Moment addMoment(@RequestBody Moment moment) {
        moment.setCreatedTime(new Date());
        return momentRepository.save(moment);
    }

    @DeleteMapping(value = "/{uid}")
    public void delMoment(@PathVariable("uid") Long uid
    ) {
        momentRepository.deleteById(uid);
    }

    @GetMapping(value = "/byUser/{createdUser}")
    public List<MomentDto> getByCreatedUser(@PathVariable("createdUser") String createdUser) {
        List<Moment> moments = momentRepository.findByCreatedUser(createdUser);
        return attachMoment(moments);
    }

    private List<MomentDto> attachMoment(List<Moment> moments) {
        List<MomentDto> momentDtos = new ArrayList<>();
        for(Moment moment: moments) {
            List<Comment> comments = commentController.getByMomentId(String.valueOf(moment.getId()));
            List<Vote> votes = voteController.getByMomentId(String.valueOf(moment.getId()));
            comments.sort(new Comparator<Comment>() {
                @Override
                public int compare(Comment o1, Comment o2) {
                    if(o2.getCreatedTime().getTime() - o1.getCreatedTime().getTime() > 0) {
                        return 1;
                    } else {
                        return -1;
                    }
                }
            });
            MomentDto momentDto = new MomentDto();
            momentDto.setId(String.valueOf(moment.getId()));
            momentDto.setComments(comments);
            momentDto.setContents(moment.getContents());
            momentDto.setCreatedTime(moment.getCreatedTime());
            momentDto.setCreatedUser(moment.getCreatedUser());
            momentDto.setTopic(moment.getTopic());
            momentDto.setVotes(votes);
            momentDtos.add(momentDto);
        }
        return momentDtos;
    }
}
