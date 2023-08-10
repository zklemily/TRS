package com.project.trs.utils;

import java.security.SecureRandom;
import java.util.Base64;

public class TokenGenerator {
    private static final int TOKEN_LENGTH = 32; // Token length in bytes

    public String generateTokenWithTimestamp() {
        SecureRandom secureRandom = new SecureRandom();
        byte[] randomBytes = new byte[TOKEN_LENGTH];
        secureRandom.nextBytes(randomBytes);

        long timestamp = System.currentTimeMillis();
        String token = Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes) + timestamp;

        return token;
    }
}
