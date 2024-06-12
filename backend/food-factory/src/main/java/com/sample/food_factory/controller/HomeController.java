package com.sample.food_factory.controller;

import org.springframework.web.bind.annotation.*;

@RestController
public class HomeController {

    @GetMapping
    public String homeController(){
        return "Welcome back to code with mmmm";
    }

//    @PostMapping
//    @PutMapping
//    @DeleteMapping

}
