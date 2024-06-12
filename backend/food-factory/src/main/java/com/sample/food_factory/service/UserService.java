package com.sample.food_factory.service;

import com.sample.food_factory.model.User;

public interface UserService {

    public User findUserById(Long userId) throws Exception;
    public User findUserByJwt(String jwt) throws Exception;
}
