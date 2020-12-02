package com.example.capstone.model;

import lombok.*;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.AUTO;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder

public class Vote {
    @Id
    @GeneratedValue(strategy = AUTO)
    private Long voteId;
    private VoteType voteType;
    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "postId", referencedColumnName = "postId")
    private Moment moment;
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "userId", referencedColumnName = "userId")
    private User user;
}
