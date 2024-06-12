package com.sample.food_factory.controller;

import com.sample.food_factory.model.User;
import com.sample.food_factory.repository.UserRepository;
import com.sample.food_factory.service.UserService;
import jakarta.persistence.GeneratedValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("api/users/profile")
    public User findUserByJwt(@RequestHeader("Authorization") String jwt) throws Exception{
       User user = userService.findUserByJwt(jwt);
       return user;
    }





//    @Autowired
//    private UserRepository userRepository;
//
//    @PostMapping("/users")
//    public User createUser(@RequestBody User user) throws Exception{
//        User isExist = userRepository.findByEmail(user.getEmail());
//        if(isExist!=null){
//            throw new Exception("User is exist with " + user.getEmail() );
//        }
//
//        User savedUser = userRepository.save(user);
//        return savedUser;
//    }
//
//    @DeleteMapping("/users/{userId}")
//    public String deleteUser(@PathVariable Long userId) throws Exception{
//       userRepository.deleteById(userId);
//       return "User Deleted successfully.";
//    }
//
//    @GetMapping("/users")
//    public List<User> getAllUser() throws Exception{
//        List<User> users =userRepository.findAll();
//        return users;
//    }


}
