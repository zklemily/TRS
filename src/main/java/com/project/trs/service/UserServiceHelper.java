package com.project.trs.service;

import com.project.trs.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
public class UserServiceHelper {
    @Autowired
    private UserRepository userRepository;
    private static final String EMAIL_REGEX = "^[\\w.%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}";
    private static final Pattern EMAIL_PATTERN = Pattern.compile(EMAIL_REGEX);
    private static final String USERNAME_REGEX = "^[a-zA-Z][a-zA-Z0-9]{5,12}$";
    private static final Pattern USERNAME_PATTERN = Pattern.compile(USERNAME_REGEX);
    private static final String PASSWORD_REGEX = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{12,20}$";
    private static final Pattern PASSWORD_PATTERN = Pattern.compile(PASSWORD_REGEX);


    public boolean isDuplicateEmail(String email) {
        return userRepository.findByEmail(email) != null;
    }

    public boolean invalidEmailFormat(String email) {
        return !EMAIL_PATTERN.matcher(email).matches();
    }

    public boolean invalidUsernameFormat(String username) {
        return !USERNAME_PATTERN.matcher(username).matches();
    }

    public boolean invalidPasswordFormat(String password) {
        return !PASSWORD_PATTERN.matcher(password).matches();
    }
}
