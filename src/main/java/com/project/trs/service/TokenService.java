package com.project.trs.service;

import com.project.trs.model.user.Token;

import java.util.Optional;

public interface TokenService {
    public void saveToken(Token token);

    public Optional<Token> getToken(String token);
}
