package com.niranjan.dto;

import lombok.Data;
import java.util.Set;

@Data
public class LoginRequest {
    private String email;
    private String password;
}
