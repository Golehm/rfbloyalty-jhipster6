package com.rfb.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class RfbUserMapperTest {

    private RfbUserMapper rfbUserMapper;

    @BeforeEach
    public void setUp() {
        rfbUserMapper = new RfbUserMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(rfbUserMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(rfbUserMapper.fromId(null)).isNull();
    }
}
