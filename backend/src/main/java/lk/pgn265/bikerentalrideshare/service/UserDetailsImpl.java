package lk.pgn265.bikerentalrideshare.service;


import lk.pgn265.bikerentalrideshare.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class UserDetailsImpl implements UserDetails {

    private final User user;

    public UserDetailsImpl(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority("USER"));
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getName();
    }

//    public Map<String, ?> getUser()  {
//        return Map.of(
//                "id", user.getId(),
//                "username", user.getName(),
//                "email", user.getEmail(),
//                "role", user.getRole()
//        );
//    }

    public User getUserDetails() {
        return user;
    }
}
