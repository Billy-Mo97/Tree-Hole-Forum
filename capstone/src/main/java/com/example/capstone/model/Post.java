package com.example.capstone.model;

import java.time.*;

import lombok.*;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.SEQUENCE;


@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class Post {

    //post id
    @Id
    @GeneratedValue(strategy = SEQUENCE)
    private long postId;

    //Post Name
    @NotBlank(message = "Post Empty Name Error")
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
