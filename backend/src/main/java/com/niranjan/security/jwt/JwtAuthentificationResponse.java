package com.niranjan.security.jwt;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtAuthentificationResponse {
    private String token;

}
