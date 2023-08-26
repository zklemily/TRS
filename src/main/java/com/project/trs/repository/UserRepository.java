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
    User findByEmailAndIsActiveTrue(String email);
    User findByUsernameAndIsActiveTrue(String username);

    @Transactional
    @Modifying
    @Query(value = "UPDATE user u SET u.is_active = TRUE WHERE u.id IN (SELECT t.user_id FROM token t " +
            "WHERE t.token = :token AND u.email = :email)", nativeQuery = true)
    int activateUser(@Param("email") String email, @Param("token") String token);
}
