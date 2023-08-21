package com.project.trs.config;

import com.project.trs.utils.TokenGenerator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TokenConfig {

    @Bean
    public TokenGenerator tokenGenerator() {
        return new TokenGenerator();
    }
}
