package com.rfb.service.mapper;


import com.rfb.domain.*;
import com.rfb.service.dto.RfbUserDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link RfbUser} and its DTO {@link RfbUserDTO}.
 */
@Mapper(componentModel = "spring", uses = {RfbLocationMapper.class, UserMapper.class})
public interface RfbUserMapper extends EntityMapper<RfbUserDTO, RfbUser> {

    @Mapping(source = "homeLocation.id", target = "homeLocationId")
    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.login", target = "userLogin")
    RfbUserDTO toDto(RfbUser rfbUser);

    @Mapping(source = "homeLocationId", target = "homeLocation")
    @Mapping(source = "userId", target = "user")
    RfbUser toEntity(RfbUserDTO rfbUserDTO);

    default RfbUser fromId(Long id) {
        if (id == null) {
            return null;
        }
        RfbUser rfbUser = new RfbUser();
        rfbUser.setId(id);
        return rfbUser;
    }
}
