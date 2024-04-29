package com.prueba.api.authorized;

import com.prueba.api.entity.User;
import com.prueba.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class Authorized {

    private final UserService userService;
    private final Environment env;

    @PostMapping(value = "welcome")
    public String welcome(@RequestHeader("Authorization") String header){
        return header;
    }

    @PostMapping(value = "welcomeUser")
    public String welcomeUser(@RequestHeader("Authorization") String header){
        return header.substring(7);
    }

    @GetMapping(value = "user/{idUser}")
    public ResponseEntity<?> userById(@PathVariable String idUser) {
        Optional<User> optUser = userService.findById(idUser);

        if (optUser.isEmpty()){
            Map<String, Object> response = new HashMap<>();
            response.put("mensaje", env.getProperty("err.password.invalid"));
            response.put("user", null);
            return  new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }

        User user = optUser.get();
        return  new ResponseEntity<>(user, HttpStatus.OK);
    }
}
