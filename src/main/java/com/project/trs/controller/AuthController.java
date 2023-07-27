package com.project.trs.controller;

import com.project.trs.config.UserAuthenticationProvider;
import com.project.trs.dto.UserDto;
import com.project.trs.mapper.UserMapper;
import com.project.trs.model.user.LoginRequest;
import com.project.trs.model.user.User;
import com.project.trs.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class AuthController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserMapper userMapper;
    private final UserAuthenticationProvider userAuthenticationProvider;

    public AuthController(UserAuthenticationProvider userAuthenticationProvider) {
        this.userAuthenticationProvider = userAuthenticationProvider;
    }


    // may update in the future to add session token and stuff
    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody LoginRequest loginRequest) {
        // Validate the user's credentials
        User user = userService.authenticateUser(loginRequest.getUsername(), loginRequest.getPassword());
        UserDto userDto = userMapper.toUserDto(user);
        userDto.setToken(userAuthenticationProvider.createToken(userDto.getUsername()));
        return ResponseEntity.ok(userDto);
    }
}
