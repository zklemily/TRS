package com.project.trs.controller;

import com.project.trs.model.user.User;
import com.project.trs.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("")
    public ResponseEntity<String> register(@RequestBody User user) {
        System.out.println(user.getUserType().getId());
        userService.registerUser(user);
        return ResponseEntity.ok("User is added.");
    }

}
