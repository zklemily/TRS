package com.project.trs.repository;

import com.project.trs.model.user.Token;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
@Transactional
public interface TokenRepository extends JpaRepository<Token, Long> {

    Optional<Token> findByToken(String token);

    @Transactional
    @Modifying
    @Query(value = "UPDATE Token t SET t.confirmed_at = ?2 WHERE t.token = ?1", nativeQuery = true)
    int updateConfirmedAt(String token, LocalDateTime confirmedAt);
}
