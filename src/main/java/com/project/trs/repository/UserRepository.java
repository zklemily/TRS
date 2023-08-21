package com.project.trs.repository;

import com.project.trs.model.user.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String email);
    User findByUsername(String username);

    @Transactional
    @Modifying
    @Query(value = "UPDATE User a SET a.is_active = TRUE WHERE a.email = :email", nativeQuery = true)
    int activateUser(@Param("email") String email);
}
