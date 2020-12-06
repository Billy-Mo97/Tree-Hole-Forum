package com.capstone.forum.treeholeforum.controller;

import com.capstone.forum.treeholeforum.dao.LoginRequest;
import com.capstone.forum.treeholeforum.model.User;
import com.capstone.forum.treeholeforum.repository.UserRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping//查
    public List<User> getList() {
        return userRepository.findAll();
    }

    @PostMapping//改和增
    public User addUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    @DeleteMapping(value = "/{uid}")//删
    public void delUser(@PathVariable("uid") Long uid
    ) {
        userRepository.deleteById(uid);
    }

    @PostMapping(value = "/login")
    public User login(@RequestBody LoginRequest loginRequest) {
        Optional user = userRepository.findByUserName(loginRequest.getUserName());
        if(user.isPresent()) {
            return (User)user.get();
        } else {
            return new User();
        }
    }
}
