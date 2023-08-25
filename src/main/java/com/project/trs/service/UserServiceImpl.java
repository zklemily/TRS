package com.project.trs.service;

import com.project.trs.exception.UserNotFoundException;
import com.project.trs.model.user.Token;
import com.project.trs.model.user.User;
import com.project.trs.model.user.UserType;
import com.project.trs.repository.UserRepository;
import com.project.trs.repository.UserTypeRepository;
import com.project.trs.exception.AuthenticationException;
import com.project.trs.utils.TokenGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;
import java.time.LocalDateTime;
import java.util.List;

import static com.project.trs.model.user.TokenType.*;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserServiceHelper userServiceHelper;
    @Autowired
    private UserTypeRepository userTypeRepository;
    @Autowired
    private EmailSenderService emailSenderService;
    private final TokenService tokenService;
    private final TokenGenerator tokenGenerator;

    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(TokenService tokenService, TokenGenerator tokenGenerator, PasswordEncoder passwordEncoder) {
        this.tokenService = tokenService;
        this.tokenGenerator = tokenGenerator;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User registerUser(User user) {
        if (userServiceHelper.isDuplicateEmail(user.getEmail())) {
            throw new IllegalArgumentException("This email already exists.");
        }
        if (userServiceHelper.invalidEmailFormat(user.getEmail())) {
            throw new IllegalArgumentException("This email is invalid.");
        }
        if (userServiceHelper.invalidUsernameFormat(user.getUsername())) {
            throw new IllegalArgumentException("Invalid username. Username must be between 5 and 12 characters " +
                    "and start with a letter. Only letters and numbers can be used; no special characters, " +
                    "spaces nor symbols.");
        }
        if (userServiceHelper.invalidPasswordFormat(user.getPassword())) {
            throw new IllegalArgumentException("Invalid password. Password must be between 12 and 20 characters. " +
                    "It must be a combination of uppercase letters, lowercase letters, numbers, and symbols.");
        }

        // Fetch the existing UserType based on the provided type
        UserType existingUserType = userTypeRepository.findByType(user.getUserType().getType());
        // Set the fetched UserType to the User entity
        user.setUserType(existingUserType);

        // hash the password using password encoder
        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(user.getPassword())));

        // send activation email
        user.setIsActive(false);

        userRepository.save(user);

        String newToken = tokenGenerator.generateTokenWithTimestamp();
        Token token = new Token(user, newToken, ACCOUNT_ACTIVATION, LocalDateTime.now(), LocalDateTime.now().plusMinutes(15));
        tokenService.saveToken(token);

        String link = "http://localhost:8080/users/activate?token=" + newToken;
        emailSenderService.sendActivationEmail(user.getEmail(), "Activate Your Account", user.getFirstName(), link);

        return user;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(int id) {
        return userRepository.findById(id).orElseThrow(()-> new UserNotFoundException(id));
    }

    @Override
    public User getUserByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            return user;
        }
        throw new UserNotFoundException(email);
    }

    @Override
    public User getUserByUsername(String username) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            return user;
        }
        throw new UserNotFoundException(username);
    }

    @Override
    public int activateUser(String email) {
        return userRepository.activateUser(email);
    }

    @Override
    public User setPassword(String email, String newPassword) {
        User user = getUserByEmail(email);
        user.setPassword(newPassword);
        userRepository.save(user);
        return user;
    }

    @Override
    public User forgotPassword(String email) {
        User user = getUserByEmail(email);
        String newToken = tokenGenerator.generateTokenWithTimestamp();
        Token token = new Token(user, newToken, PASSWORD_RESET, LocalDateTime.now(), LocalDateTime.now().plusMinutes(15));
        tokenService.saveToken(token);

        String link = "http://localhost:3000/reset-password?email=" + email + "&token=" + token.getToken();

        emailSenderService.sendResetPasswordEmail(email, "Reset Your Password", user.getFirstName(), link);

        return user;
    }

    @Override
    public User authenticateUser(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            if (passwordEncoder.matches(CharBuffer.wrap(password), user.getPassword())) {
                return user;
            }
        }
        throw new AuthenticationException();
    }
}
