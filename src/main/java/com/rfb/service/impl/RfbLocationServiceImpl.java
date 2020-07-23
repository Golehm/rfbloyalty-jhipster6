package com.rfb.service.impl;

import com.rfb.service.RfbLocationService;
import com.rfb.domain.RfbLocation;
import com.rfb.repository.RfbLocationRepository;
import com.rfb.service.dto.RfbLocationDTO;
import com.rfb.service.mapper.RfbLocationMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link RfbLocation}.
 */
@Service
@Transactional
public class RfbLocationServiceImpl implements RfbLocationService {

    private final Logger log = LoggerFactory.getLogger(RfbLocationServiceImpl.class);

    private final RfbLocationRepository rfbLocationRepository;

    private final RfbLocationMapper rfbLocationMapper;

    public RfbLocationServiceImpl(RfbLocationRepository rfbLocationRepository, RfbLocationMapper rfbLocationMapper) {
        this.rfbLocationRepository = rfbLocationRepository;
        this.rfbLocationMapper = rfbLocationMapper;
    }

    @Override
    public RfbLocationDTO save(RfbLocationDTO rfbLocationDTO) {
        log.debug("Request to save RfbLocation : {}", rfbLocationDTO);
        RfbLocation rfbLocation = rfbLocationMapper.toEntity(rfbLocationDTO);
        rfbLocation = rfbLocationRepository.save(rfbLocation);
        return rfbLocationMapper.toDto(rfbLocation);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<RfbLocationDTO> findAll(Pageable pageable) {
        log.debug("Request to get all RfbLocations");
        return rfbLocationRepository.findAll(pageable)
            .map(rfbLocationMapper::toDto);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<RfbLocationDTO> findOne(Long id) {
        log.debug("Request to get RfbLocation : {}", id);
        return rfbLocationRepository.findById(id)
            .map(rfbLocationMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete RfbLocation : {}", id);
        rfbLocationRepository.deleteById(id);
    }
}
