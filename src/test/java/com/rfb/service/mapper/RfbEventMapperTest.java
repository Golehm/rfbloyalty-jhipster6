package com.rfb.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class RfbEventMapperTest {

    private RfbEventMapper rfbEventMapper;

    @BeforeEach
    public void setUp() {
        rfbEventMapper = new RfbEventMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(rfbEventMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(rfbEventMapper.fromId(null)).isNull();
    }
}
