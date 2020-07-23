package com.rfb.service.impl;

import com.rfb.service.RfbEventAttendanceService;
import com.rfb.domain.RfbEventAttendance;
import com.rfb.repository.RfbEventAttendanceRepository;
import com.rfb.service.dto.RfbEventAttendanceDTO;
import com.rfb.service.mapper.RfbEventAttendanceMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link RfbEventAttendance}.
 */
@Service
@Transactional
public class RfbEventAttendanceServiceImpl implements RfbEventAttendanceService {

    private final Logger log = LoggerFactory.getLogger(RfbEventAttendanceServiceImpl.class);

    private final RfbEventAttendanceRepository rfbEventAttendanceRepository;

    private final RfbEventAttendanceMapper rfbEventAttendanceMapper;

    public RfbEventAttendanceServiceImpl(RfbEventAttendanceRepository rfbEventAttendanceRepository, RfbEventAttendanceMapper rfbEventAttendanceMapper) {
        this.rfbEventAttendanceRepository = rfbEventAttendanceRepository;
        this.rfbEventAttendanceMapper = rfbEventAttendanceMapper;
    }

    @Override
    public RfbEventAttendanceDTO save(RfbEventAttendanceDTO rfbEventAttendanceDTO) {
        log.debug("Request to save RfbEventAttendance : {}", rfbEventAttendanceDTO);
        RfbEventAttendance rfbEventAttendance = rfbEventAttendanceMapper.toEntity(rfbEventAttendanceDTO);
        rfbEventAttendance = rfbEventAttendanceRepository.save(rfbEventAttendance);
        return rfbEventAttendanceMapper.toDto(rfbEventAttendance);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<RfbEventAttendanceDTO> findAll(Pageable pageable) {
        log.debug("Request to get all RfbEventAttendances");
        return rfbEventAttendanceRepository.findAll(pageable)
            .map(rfbEventAttendanceMapper::toDto);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<RfbEventAttendanceDTO> findOne(Long id) {
        log.debug("Request to get RfbEventAttendance : {}", id);
        return rfbEventAttendanceRepository.findById(id)
            .map(rfbEventAttendanceMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete RfbEventAttendance : {}", id);
        rfbEventAttendanceRepository.deleteById(id);
    }
}
