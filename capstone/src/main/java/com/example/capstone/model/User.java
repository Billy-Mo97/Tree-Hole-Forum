package com.example.capstone.model;

import java.time.*;

import lombok.*;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.util.*;
import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.SEQUENCE;


public class User {
    @Id
    @GeneratedValue(strategy = SEQUENCE)
    private Long userId;
    @NotBlank(message = "Enter an Username")
    private String username;
    @NotBlank(message = "Create a Password")
    private String password;
    @Email
    @NotEmpty(message = "Enter your Email")
    private String email;
    private Instant createdUsr;
    private boolean enabledUsr;
}
