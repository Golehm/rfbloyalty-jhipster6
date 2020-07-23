package com.rfb.service.mapper;


import com.rfb.domain.*;
import com.rfb.service.dto.RfbEventAttendanceDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link RfbEventAttendance} and its DTO {@link RfbEventAttendanceDTO}.
 */
@Mapper(componentModel = "spring", uses = {RfbUserMapper.class, RfbEventMapper.class})
public interface RfbEventAttendanceMapper extends EntityMapper<RfbEventAttendanceDTO, RfbEventAttendance> {

    @Mapping(source = "rfbUser.id", target = "rfbUserId")
    @Mapping(source = "rfbEvent.id", target = "rfbEventId")
    RfbEventAttendanceDTO toDto(RfbEventAttendance rfbEventAttendance);

    @Mapping(source = "rfbUserId", target = "rfbUser")
    @Mapping(source = "rfbEventId", target = "rfbEvent")
    RfbEventAttendance toEntity(RfbEventAttendanceDTO rfbEventAttendanceDTO);

    default RfbEventAttendance fromId(Long id) {
        if (id == null) {
            return null;
        }
        RfbEventAttendance rfbEventAttendance = new RfbEventAttendance();
        rfbEventAttendance.setId(id);
        return rfbEventAttendance;
    }
}
