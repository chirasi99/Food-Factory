package com.sample.food_factory.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.security.core.Authentication;

@Service
public class JwtProvider {
//    private SecretKey key = Keys.hmacShaKeyFor(JwtConstant.JWT_SECRET.getBytes());
    private Key key;

        @PostConstruct
        public void init() {
            // Generate a secure key
            this.key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
        }

    public String generateToken(Authentication auth){
        String jwt = Jwts.builder()
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 day in milliseconds
                .claim("email", auth.getName())
                .signWith(key)
                .compact();
        return jwt;
    }

    public String getEmailFromJwtToken(String jwt){
        jwt = jwt.substring(7);
        Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
        String email= String.valueOf(claims.get("email"));
        return email;
    }


//    Bearer jwt - (client will send the token) (skipping b, e, a, r,e,r, , charaters skipping 6 chars).
}
