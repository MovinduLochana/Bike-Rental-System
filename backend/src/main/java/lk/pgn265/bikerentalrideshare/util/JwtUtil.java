package lk.pgn265.bikerentalrideshare.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Map;
import java.util.Optional;

@Component // Try @Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    public String generateToken(String username, int id) {
        return Jwts.builder()
                .subject(username)
                .claims(Map.of(
                        "id", id,
                        "role", "USER"
                ))
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getKey())
                .compact();
    }

    private SecretKey getKey() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public Optional<Claims> getClaimsFromToken(String token) {
        try {
            return Optional.of(Jwts.parser()
                    .verifyWith(getKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload());
        } catch (RuntimeException e) {
            System.err.println(e.getMessage());
            return Optional.empty();
        }
    }

    public String getUsernameFromToken(String jwtToken) {
        var claims = getClaimsFromToken(jwtToken);
        return claims.map(Claims::getSubject).orElse(null);
    }
    public boolean validateToken(String token, UserDetails userDetails) {
        return (getUsernameFromToken(token).equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    public boolean isTokenExpired(String token) {
        return getClaimsFromToken(token).map(Claims::getExpiration).orElse(null).before(new Date(System.currentTimeMillis()));
    }
}
