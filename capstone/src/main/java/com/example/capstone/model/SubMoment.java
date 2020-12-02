package com.example.capstone.model;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.Instant;
import java.util.List;

import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.AUTO;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class SubMoment {
    @Id
    @GeneratedValue(strategy = AUTO)
    private Long id;
    @NotBlank(message = "You need to enter name")
    private String name;
    @NotBlank(message = "You need to enter introduction")
    private String intro;
    @OneToMany(fetch = LAZY)
    private List<Moment> moments;
    private Instant createdTime;
    @ManyToOne(fetch = LAZY)
    private User user;
}