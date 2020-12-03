package com.capstone.forum.treeholeforum.model;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VerifyMail {
    private String subject;
    private String recipient;
    private String body;
}
