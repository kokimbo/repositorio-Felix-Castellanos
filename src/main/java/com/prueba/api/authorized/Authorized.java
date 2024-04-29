package com.prueba.api.authorized;

import com.prueba.api.entity.User;
import com.prueba.api.entity.dto.UserDTO;
import com.prueba.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class Authorized {

    private final UserService userService;
    private final Environment env;

//    @PostMapping(value = "welcome")
//    public String welcome(@RequestHeader("Authorization") String header){
//        return header;
//    }

    @GetMapping(value = "user/{idUser}")
    public ResponseEntity<?> userById(@PathVariable String idUser) {
        Optional<User> optUser = userService.findById(idUser);

        if (optUser.isEmpty()){
            Map<String, Object> response = new HashMap<>();
            response.put("mensaje", env.getProperty("err.invalid.id") + " - Error select");
            response.put("user", null);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }

        User user = optUser.get();
        UserDTO userDTO = UserDTO.userToDto(user);

        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }

    //Cuando el delete es exitoso, tengo que devolver una respuesta, no un objeto
    @DeleteMapping(value = "user/{idUser}")
    public ResponseEntity<?> delete(@PathVariable String idUser) {
        Optional<User> optUser = userService.findById(idUser);

        if (optUser.isEmpty()){
            Map<String, Object> response = new HashMap<>();
            response.put("mensaje", env.getProperty("err.invalid.id") + " - Error delete");
            response.put("user", null);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }

        User user = optUser.get();
        userService.delete(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping(value = "user")
    public ResponseEntity<?> update(@RequestBody UserDTO userBody) {
        Optional<User> optUser = userService.findById(userBody.getId());

        if (optUser.isEmpty()){
            Map<String, Object> response = new HashMap<>();
            response.put("mensaje", env.getProperty("err.invalid.id") + " - Error update");
            response.put("user", null);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }

        User user = optUser.get();

        user.setEmail(userBody.getEmail());
        user.setProvincia(userBody.getProvincia());
        user.setName(userBody.getName());
        user.setUsername(userBody.getUsername());

        userService.saveUser(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
