package lk.pgn265.bikerentalrideshare.repo;

import lk.pgn265.bikerentalrideshare.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {
    Optional<User> findByName(String name);

    boolean existsUserByEmail(String email);

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.name = ?2, u.email = ?3, u.address = ?4, u.phone = ?5 WHERE u.id = ?1")
    void updateUserProfileById(int id, String name, String email, String address, String phone);

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.password = ?3 WHERE u.id = ?1 and u.password = ?2")
    void changePasswordById(int id, String oldPassword, String newPassword);
}
