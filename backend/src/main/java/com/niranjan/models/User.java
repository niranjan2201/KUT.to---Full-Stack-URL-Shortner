package com.niranjan.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String username;   // ✅ fixed (small u)
    @Column(unique = true, nullable = false)
    private String email;
    private String password;
    private String role = "ROLE_USER";

    private String resetToken;
    private java.time.LocalDateTime resetTokenExpiry;
}
