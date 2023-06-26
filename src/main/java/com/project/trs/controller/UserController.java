package com.project.trs.controller;

import com.project.trs.model.user.User;
import com.project.trs.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("")
    public ResponseEntity<String> register(@RequestBody User user) {
        userService.registerUser(user);
        return ResponseEntity.ok("User is added.");
    }

//    maybe used in the future for batch update
//    @PostMapping("/batch")
//    public ResponseEntity<String> register(@RequestBody List<User> users) {
//        for (User u : users) {
//            userService.registerUser(u);
//        }
//        return ResponseEntity.ok("Users are added.");
//    }

    @GetMapping("")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    User getUserById(@PathVariable int id) {
        return userService.getUserById(id);
    }


}
