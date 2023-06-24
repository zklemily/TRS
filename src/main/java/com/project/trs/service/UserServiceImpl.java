package com.project.trs.service;

import com.project.trs.model.user.User;
import com.project.trs.model.user.UserType;
import com.project.trs.repository.UserRepository;
import com.project.trs.repository.UserTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserServiceHelper userServiceHelper;
    @Autowired
    private UserTypeRepository userTypeRepository;

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
        return userRepository.save(user);
    }
}
