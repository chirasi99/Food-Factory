package com.sample.food_factory.controller;

import com.sample.food_factory.config.JwtProvider;
import com.sample.food_factory.model.User;
import com.sample.food_factory.repository.UserRepository;
import com.sample.food_factory.request.LoginRequest;
import com.sample.food_factory.response.AuthResponse;
import com.sample.food_factory.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CustomUserDetailsService customUserDetails;
    @Autowired
    private JwtProvider jwtProvider;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public AuthResponse createUser(@RequestBody User user) throws Exception{
        String email = user.getEmail();
        String password = user.getPassword();
        String fullName = user.getFullName();
        User isExistEmail  = userRepository.findByEmail(email);
        if(isExistEmail!=null){
            throw new Exception("Email is already used with another account...");
        }else{
            User createdUser = new User();
            createdUser.setEmail(email);
            createdUser.setPassword(passwordEncoder.encode(password));
            createdUser.setFullName(fullName);

            User savedUser = userRepository.save(createdUser);
            Authentication authentication = new UsernamePasswordAuthenticationToken(email,password);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            String token = jwtProvider.generateToken(authentication);
            AuthResponse response = new AuthResponse();
            response.setJwt(token);
            response.setMessage("SignUp Success");
            return response;
        }
    }

    @PostMapping("/signin")
    public AuthResponse signInHandler(@RequestBody LoginRequest loginRequest){
        String Username = loginRequest.getEmail();
        String Password = loginRequest.getPassword();
        Authentication authentication =  authenticate(Username, Password);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtProvider.generateToken(authentication);
        AuthResponse response = new AuthResponse();
        response.setJwt(token);
        response.setMessage("SignIn Success");
        return response;
    }

    private Authentication authenticate(String username, String password) {
        UserDetails userDetails = customUserDetails.loadUserByUsername(username);
        if(userDetails == null ){
            throw new BadCredentialsException("User not found!");
        }
        if(!passwordEncoder.matches(password, userDetails.getPassword())){
            throw new BadCredentialsException("Invalid Password!");
        }
        return new UsernamePasswordAuthenticationToken(userDetails,null, userDetails.getAuthorities());
    }

}
