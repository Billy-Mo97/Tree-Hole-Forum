package com.example.capstone.model;

import java.time.*;

import lombok.*;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.util.*;
import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.SEQUENCE;
public class SubMoment {
    @Id
    @GeneratedValue(strategy = SEQUENCE)
    private Long id;
    @NotBlank(message = "You need to enter a name")
    private String name;
    @NotBlank(message = "You need to enter an introduction")
    private String introduction;
    @OneToMany(fetch = LAZY)
    private List<Post> postMoments;
    private Instant createdTime;
    @ManyToOne(fetch = LAZY)
    private User user;
}
