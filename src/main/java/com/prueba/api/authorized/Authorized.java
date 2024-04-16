package com.prueba.api.authorized;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class Authorized {

    @PostMapping(value = "welcome")
    public String welcome(){
        return "Welcome to los Pollos Hermanos";
    }

}
