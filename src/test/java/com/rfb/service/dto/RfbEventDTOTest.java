package com.rfb.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.rfb.web.rest.TestUtil;

public class RfbEventDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(RfbEventDTO.class);
        RfbEventDTO rfbEventDTO1 = new RfbEventDTO();
        rfbEventDTO1.setId(1L);
        RfbEventDTO rfbEventDTO2 = new RfbEventDTO();
        assertThat(rfbEventDTO1).isNotEqualTo(rfbEventDTO2);
        rfbEventDTO2.setId(rfbEventDTO1.getId());
        assertThat(rfbEventDTO1).isEqualTo(rfbEventDTO2);
        rfbEventDTO2.setId(2L);
        assertThat(rfbEventDTO1).isNotEqualTo(rfbEventDTO2);
        rfbEventDTO1.setId(null);
        assertThat(rfbEventDTO1).isNotEqualTo(rfbEventDTO2);
    }
}
