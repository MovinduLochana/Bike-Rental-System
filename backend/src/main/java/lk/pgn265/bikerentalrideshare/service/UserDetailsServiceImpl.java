package lk.pgn265.bikerentalrideshare.service;

import lk.pgn265.bikerentalrideshare.repo.UserRepo;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    // check bean, entity, security, how injectwork
    private final UserRepo users;

    public UserDetailsServiceImpl(UserRepo users) {
        this.users = users;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return new UserDetailsImpl(users.findByName(username).orElseThrow(() -> new UsernameNotFoundException("Username :" + username + " Not Found")));
    }
}
