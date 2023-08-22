package com.project.trs.mapper;

import com.project.trs.dto.SignUpDto;
import com.project.trs.dto.UserDto;
import com.project.trs.model.user.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto toUserDto(User user);

    @Mapping(target = "password", ignore = true)
    User signUpToUser(SignUpDto signUpDto);
}
