package com.capstone.forum.treeholeforum.model;

import java.time.*;

import lombok.*;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.AUTO;


@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class Moment {

    //moment id
    @Id
    @GeneratedValue(strategy = AUTO)
    private long postId;

    //Moment Name
    @NotBlank(message = "Moment Empty Name Error")
    private String postName;

    @Nullable
    private String url;

    @Nullable
    @Lob
    private String intro;
    private int voteCounter;


    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "userId", referencedColumnName = "userId")
    private User user;
    private Instant createdTime;


    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "id", referencedColumnName = "id")
    private SubMoment subMoment;
}