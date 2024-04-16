package com.prueba.api.jwt;

import com.prueba.api.entity.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {

    private static final String KEY = "4865SD881E4H2CS5W6J52MW51XXOP4DS5S6FH2U9WF9J9SVWE25EGV2E9JJ10HBV8E1VS1I95K5JS9H1B5";
    public String getToken(UserDetails user) {
        return getToken(new HashMap<>(), user);
    }

    private <K, V> String getToken(Map<String,Object> extraClaims, UserDetails user) {
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(user.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+1000*24*60))
                .signWith(getKey(), SignatureAlgorithm.RS256)
                .compact();
    }

    private Key getKey() {
        byte[] keyBytes = Decoders.BASE64.decode(KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
