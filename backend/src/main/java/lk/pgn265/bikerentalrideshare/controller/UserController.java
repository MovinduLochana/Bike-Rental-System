package lk.pgn265.bikerentalrideshare.controller;

import lk.pgn265.bikerentalrideshare.dto.PasswordChange;
import lk.pgn265.bikerentalrideshare.dto.UserResponse;
import lk.pgn265.bikerentalrideshare.model.User;
import lk.pgn265.bikerentalrideshare.repo.UserRepo;
import lk.pgn265.bikerentalrideshare.service.UserDetailsImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    private final BCryptPasswordEncoder pe = new BCryptPasswordEncoder(4); // 2 pow 4

    private final UserRepo users;

    public UserController(UserRepo users) {
        this.users = users;
    }

    @PostMapping("/add")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        user.setPassword(pe.encode(user.getPassword()));
        return ResponseEntity.ok(users.save(user));
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable int id) {
        return users.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/check-email")
    public ResponseEntity<Boolean> checkUserExists(@RequestParam String email) {
        return ResponseEntity.ok(users.existsUserByEmail(email));
    }

    @PutMapping
    public ResponseEntity<String> updateUserProfile(@RequestBody UserResponse user) {
        var auth = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var currentUser = auth.getUserDetails();

        if (currentUser.getId() != user.id()) {
            return ResponseEntity.status(403).build();
        }

        users.updateUserProfileById(user.id(), user.name(), user.email(), user.address(), user.phone());
        return ResponseEntity.ok("done");
    }

    @PatchMapping("/change-password")
    public ResponseEntity<String> updateUserPassword(@RequestBody PasswordChange pass, @AuthenticationPrincipal UserDetails userDetails) {

        System.out.println(userDetails.getPassword());

        users.changePasswordById(pass.id(), pe.encode(pass.oldPassword()), pe.encode(pass.newPassword()));
        return ResponseEntity.ok("done");
    }
}


