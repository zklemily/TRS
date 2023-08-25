package com.project.trs.controller;

import com.project.trs.config.UserAuthenticationProvider;
import com.project.trs.dto.UserDto;
import com.project.trs.mapper.UserMapper;
import com.project.trs.model.user.Token;
import com.project.trs.model.user.User;
import com.project.trs.service.TokenService;
import com.project.trs.service.UserService;
import com.project.trs.service.UserServiceHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserServiceHelper userServiceHelper;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private TokenService tokenService;
    private final UserAuthenticationProvider userAuthenticationProvider;

    public UserController(UserAuthenticationProvider userAuthenticationProvider) {
        this.userAuthenticationProvider = userAuthenticationProvider;
    }

    @PostMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserDto> register(@RequestBody User user) {
        User savedUser = userService.registerUser(user);
        UserDto userDto = userMapper.toUserDto(savedUser);
        userDto.setToken(userAuthenticationProvider.createToken(userDto.getUsername()));
        return ResponseEntity.created(URI.create("/users."+userDto.getId())).body(userDto);
    }

    @GetMapping("")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/current")
    public ResponseEntity<User> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String username = authentication.getName();
        User user = userService.getUserByUsername(username);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable int id) {
        return userService.getUserById(id);
    }

    @GetMapping("/check/email={email}")
    public User getUserByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email);
    }

    @GetMapping("/check/username={username}")
    public User getUserByUsername(@PathVariable String username) {
        return userService.getUserByUsername(username);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateUser(@PathVariable int id, @RequestBody User updateUser) {
        User curUser = userService.getUserById(id);

        // update username
        if (updateUser.getUsername() != null) {
            if (userServiceHelper.invalidUsernameFormat(updateUser.getUsername())) {
                throw new IllegalArgumentException("Invalid username. Username must be between 5 and 12 characters " +
                        "and start with a letter. Only letters and numbers can be used; no special characters, " +
                        "spaces nor symbols.");
            }
            curUser.setUsername(updateUser.getUsername());
        }

        // update password
        if (updateUser.getPassword() != null) {
            if (userServiceHelper.invalidPasswordFormat(updateUser.getPassword())) {
                throw new IllegalArgumentException("Invalid password. Password must be between 12 and 20 characters. " +
                        "It must be a combination of uppercase letters, lowercase letters, numbers, and symbols.");
            }
            curUser.setPassword(updateUser.getPassword());
        }

        // update email
        if (updateUser.getEmail() != null) {
            if (userServiceHelper.isDuplicateEmail(updateUser.getEmail())) {
                throw new IllegalArgumentException("This email already exists.");
            }
            if (userServiceHelper.invalidEmailFormat(updateUser.getEmail())) {
                throw new IllegalArgumentException("Invalid email format.");
            }
        }

        userService.saveUser(curUser);

        return ResponseEntity.ok("User is updated.");
    }

    @GetMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestParam("email") String email) {
        System.out.println("TEST!!! I'M HERE!!!!!!!");
        userService.forgotPassword(email);
        return ResponseEntity.ok("Reset password link is sent.");
    }

    @PutMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam("email") String email, @RequestParam("token") String token, @RequestBody String newPassword) {
        System.out.println("TEST!!! I'M HERE!!!");
        Token confirmToken = tokenService.getToken(token).orElseThrow(()->new IllegalStateException("Token not found."));

        if (confirmToken.getConfirmedAt() != null) {
            throw new IllegalStateException("Password already reset.");
        }
        LocalDateTime expiredAt = confirmToken.getExpiresAt();
        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("Token expired.");
        }

        tokenService.setConfirmedAt(token);

        userService.setPassword(email, newPassword);

        return ResponseEntity.ok("Password reset successfully.");
    }

    @GetMapping("/activate")
    public ResponseEntity<String> activateAccount(@RequestParam("token") String token) {
        Token confirmToken = tokenService.getToken(token).orElseThrow(()->new IllegalStateException("Token not found."));

        if (confirmToken.getConfirmedAt() != null) {
            throw new IllegalStateException("Email already activated.");
        }
        LocalDateTime expiredAt = confirmToken.getExpiresAt();
        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("Token expired.");
        }

        tokenService.setConfirmedAt(token);

        userService.activateUser(confirmToken.getUser().getEmail());

        return ResponseEntity.ok("User is activated");
    }


}
