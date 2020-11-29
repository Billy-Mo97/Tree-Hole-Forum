package com.example.capstone.model;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VerifyMail {
    private String subject;
    private String recipient;
    private String body;
}
