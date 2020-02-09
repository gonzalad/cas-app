package com.example.demo.greetings;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/greetings")
public class GreetingsController {

    @GetMapping
    public GreetingsResource sayGreetings() {
        return new GreetingsResource("Hello sir");
    }
}
