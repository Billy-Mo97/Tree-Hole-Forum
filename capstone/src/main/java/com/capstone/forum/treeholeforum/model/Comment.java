package com.capstone.forum.treeholeforum.model;

import java.time.*;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.AUTO;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = AUTO)
    private long id;

    //comment content is non-empty
    @NotEmpty
    private String contentText;

    //each moment's comment an ID and create time
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "postId", referencedColumnName = "postId")
    private Moment moment;
    private Instant createTime;

    // get user of the comment
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "userId", referencedColumnName = "userId")
    private User user;
}
