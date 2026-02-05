package com.niranjan.repository;


import com.niranjan.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    java.util.Optional<User> findByEmail(String email);
    java.util.Optional<User> findByUsername(String name);
    java.util.Optional<User> findByResetToken(String resetToken);
}
