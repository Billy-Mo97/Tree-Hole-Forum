package com.capstone.forum.treeholeforum.service;

import com.capstone.forum.treeholeforum.DTO.RegReqBody;
import com.capstone.forum.treeholeforum.repo.UserRepository;
import com.capstone.forum.treeholeforum.repo.VerifyTokenRepository;
import com.capstone.forum.treeholeforum.model.User;
import com.capstone.forum.treeholeforum.model.VerifyToken;
import com.example.capstone.repo.*;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;

@Service
@AllArgsConstructor
@Transactional
public class AuthEditService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final VerifyTokenRepository verifyTokenRepository;
    private final AuthenticationManager authenticationManager;


    public void signup(RegReqBody registerRequest) {
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setCreatedUsr(Instant.now());
        user.setEnabledUsr(false);

        userRepository.save(user);

        String token = generateVerificationToken(user);
    }

    @Transactional(readOnly = true)
    public User getCurrentUser() {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.
                getContext().getAuthentication().getPrincipal();
        return userRepository.findByUsername(principal.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User name not found - " + principal.getUsername()));
    }

    private void fetchUserAndEnable(VerifyToken verifyToken) {
        String username = verifyToken.getUser().getUsername();
        User user = userRepository.findByUsername(username).get();
        user.setEnabledUsr(true);
        userRepository.save(user);
    }

    private String generateVerificationToken(User user) {
        String token = UUID.randomUUID().toString();
        VerifyToken verifyToken = new VerifyToken();
        verifyToken.setToken(token);
        verifyToken.setUser(user);

        verifyTokenRepository.save(verifyToken);
        return token;
    }


    public boolean isLoggedIn() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return !(authentication instanceof AnonymousAuthenticationToken) && authentication.isAuthenticated();
    }
}