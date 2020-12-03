package com.capstone.forum.treeholeforum.DTO;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegReqBody {
    private String username;
    private String email;
    private String password;
}
