package lk.pgn265.bikerentalrideshare.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lk.pgn265.bikerentalrideshare.dto.UserResponse;
import lk.pgn265.bikerentalrideshare.model.User;
import lk.pgn265.bikerentalrideshare.service.UserDetailsImpl;
import lk.pgn265.bikerentalrideshare.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authManger;
    private final JwtUtil jwtUtil;

    public AuthController(AuthenticationManager authManger, JwtUtil jwtUtil) {
        this.authManger = authManger;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(@RequestBody User user, HttpServletResponse res) {
        var auth = authManger.authenticate(new UsernamePasswordAuthenticationToken(user.getName(), user.getPassword()));
        var data = ((UserDetailsImpl) auth.getPrincipal()).getUserDetails();

        if(!auth.isAuthenticated()) ResponseEntity.status(401);

        var cookie = new Cookie("auth_token", jwtUtil.generateToken(data.getName(), data.getId()));
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(60 * 60 * 24); // 1 day

        res.addCookie(cookie);

        return ResponseEntity.ok(UserResponse.mapper(data));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {

        var cookie = new Cookie("auth_token", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(@CookieValue(name = "auth_token", required = false) String token) {

        if (token == null) {
            return ResponseEntity.status(401).build();
        }

        var auth = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(UserResponse.mapper(auth.getUserDetails()));
    }
}
