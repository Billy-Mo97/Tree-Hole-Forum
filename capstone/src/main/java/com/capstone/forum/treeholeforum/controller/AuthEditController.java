package com.capstone.forum.treeholeforum.controller;


import com.capstone.forum.treeholeforum.DTO.RegReqBody;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor

public class AuthEditController {
    private final AuthEditService authEditService;

    @PostMapping("/signup")
    public ResponseEntity signup(@RequestBody RegReqBody registerRequest) {
        authEditService.signup(registerRequest);
        ResponseEntity responseEntity = new ResponseEntity(OK);
        return responseEntity;
    }
}
