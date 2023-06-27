package com.project.trs.controller;

import com.project.trs.model.user.User;
import com.project.trs.service.UserService;
import com.project.trs.service.UserServiceHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserServiceHelper userServiceHelper;

    @PostMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE)
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
    public User getUserById(@PathVariable int id) {
        return userService.getUserById(id);
    }

    // what fields do we allow to update?
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

        userService.saveUser(curUser);

        return ResponseEntity.ok("User is updated.");
    }


}
