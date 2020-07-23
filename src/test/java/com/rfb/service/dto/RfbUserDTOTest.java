package com.rfb.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.rfb.web.rest.TestUtil;

public class RfbUserDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(RfbUserDTO.class);
        RfbUserDTO rfbUserDTO1 = new RfbUserDTO();
        rfbUserDTO1.setId(1L);
        RfbUserDTO rfbUserDTO2 = new RfbUserDTO();
        assertThat(rfbUserDTO1).isNotEqualTo(rfbUserDTO2);
        rfbUserDTO2.setId(rfbUserDTO1.getId());
        assertThat(rfbUserDTO1).isEqualTo(rfbUserDTO2);
        rfbUserDTO2.setId(2L);
        assertThat(rfbUserDTO1).isNotEqualTo(rfbUserDTO2);
        rfbUserDTO1.setId(null);
        assertThat(rfbUserDTO1).isNotEqualTo(rfbUserDTO2);
    }
}
