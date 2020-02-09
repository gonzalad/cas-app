package com.example.demo.greetings;

import com.fasterxml.jackson.annotation.JsonCreator;

public class GreetingsResource {
    private String message;

    @JsonCreator
    public GreetingsResource(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
