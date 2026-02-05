package com.niranjan.service;

import com.niranjan.dto.LoginRequest;
import com.niranjan.models.User;
import com.niranjan.repository.UserRepository;
import com.niranjan.security.jwt.JwtAuthentificationResponse;
import com.niranjan.security.jwt.JwtUtils;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {

    private PasswordEncoder passwordEncoder;
    private UserRepository userRepository;
    private AuthenticationManager authenticationManager;
    private JwtUtils jwtUtils;


    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public JwtAuthentificationResponse LoginUser (LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String jwt = jwtUtils.generateToken(userDetails);

        return new JwtAuthentificationResponse(jwt);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found with username: " + email));
    }

    public void processForgotPassword(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));

        String token = java.util.UUID.randomUUID().toString();
        user.setResetToken(token);
        user.setResetTokenExpiry(java.time.LocalDateTime.now().plusMinutes(15));
        userRepository.save(user);

        try {
            // We need to inject EmailService here, but circular dependency might occur if not careful.
            // For now, let's assume valid injection or use a different approach if needed.
            // *Wait*, EmailService is used in AuthController, not here usually to avoid circular deps if EmailService needs UserService.
            // But EmailService is independent. Let's return the token or user and let Controller send email?
            // OR better: Inject EmailService here.
        } catch (Exception e) {
            throw new RuntimeException("Error generating reset token");
        }
    }

    // Checking dependencies... AuthController has EmailService and UserService.
    // Let's keep email sending in Controller for now to avoid modifying Constructor here if possible, 
    // OR just modify constructor to add EmailService. 
    // Looking at file content, UserService uses AllArgsConstructor. 
    // I will let the Controller handle the email sending to keep Service 'pure' logic-wise 
    // or add EmailService field.
    
    // DECISION: Add business logic here, return the token/user, handling email in Controller 
    // is often cleaner for "orchestration", but "Service layer handles business" is also valid.
    // Let's stick to the plan: Logic here.
    
    public String generateResetToken(String email) {
         User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
         String token = java.util.UUID.randomUUID().toString();
         user.setResetToken(token);
         user.setResetTokenExpiry(java.time.LocalDateTime.now().plusMinutes(15));
         userRepository.save(user);
         return token;
    }

    public void resetPassword(String token, String newPassword) {
        User user = userRepository.findByResetToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token"));

        if (user.getResetTokenExpiry().isBefore(java.time.LocalDateTime.now())) {
            throw new RuntimeException("Token expired");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetToken(null);
        user.setResetTokenExpiry(null);
        userRepository.save(user);
    }
}
