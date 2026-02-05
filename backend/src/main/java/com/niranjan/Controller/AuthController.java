package com.niranjan.Controller;

import com.niranjan.dto.LoginRequest;
import com.niranjan.dto.RegisterRequest;
import com.niranjan.models.User;
import com.niranjan.service.EmailService;
import com.niranjan.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {

    private UserService userService;
    private EmailService emailService;  // ✅ add this

    @PostMapping("/public/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            return ResponseEntity.ok(userService.LoginUser(loginRequest));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid email or password");
        }
    }

    @PostMapping("/public/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {

        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setPassword(registerRequest.getPassword());
        user.setEmail(registerRequest.getEmail());
        user.setRole("ROLE_USER");

        User savedUser = userService.registerUser(user);  // ✅ save user

        // ✅ send welcome mail
        try {
            emailService.sendWelcomeEmail(savedUser.getEmail(), savedUser.getUsername());
        } catch (Exception e) {
            System.out.println("Welcome mail failed: " + e.getMessage());
        }

        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/public/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody com.niranjan.dto.ForgotPasswordRequest request) {
        try {
            String token = userService.generateResetToken(request.getEmail());
            // In a real app, don't return the token. We only return it here if strictly debugging.
            // But we must SEND the email.
            emailService.sendResetPasswordEmail(request.getEmail(), token);
            return ResponseEntity.ok("Reset link sent to your email.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/public/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody com.niranjan.dto.ResetPasswordRequest request) {
        try {
            userService.resetPassword(request.getToken(), request.getNewPassword());
            return ResponseEntity.ok("Password reset successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
