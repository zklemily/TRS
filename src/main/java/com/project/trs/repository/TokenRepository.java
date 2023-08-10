package com.project.trs.repository;

import com.project.trs.model.user.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<Token, Long> {

    Optional<Token> findByToken(String token);

    @Query(value = "UPDATE Token c SET c.confirmed_at = :confirmedAt WHERE c.token = :token", nativeQuery = true)
    int updateConfirmedAt(@Param("token") String token, @Param("confirmedAt") LocalDateTime confirmedAt);
}
