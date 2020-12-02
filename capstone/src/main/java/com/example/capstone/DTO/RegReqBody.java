package com.example.capstone.DTO;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegReqBody {
    private String username;
    private String email;
    private String password;
}
