package com.project.trs.repository;

import com.project.trs.model.user.UserType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserTypeRepository extends JpaRepository<UserType, Integer> {
    public UserType findByType(String type);
}
