package com.rfb.service.dto;

import java.time.LocalDate;
import java.io.Serializable;

/**
 * A DTO for the {@link com.rfb.domain.RfbEvent} entity.
 */
public class RfbEventDTO implements Serializable {
    
    private Long id;

    private LocalDate eventDate;

    private String eventCode;


    private Long rfbLocationId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getEventDate() {
        return eventDate;
    }

    public void setEventDate(LocalDate eventDate) {
        this.eventDate = eventDate;
    }

    public String getEventCode() {
        return eventCode;
    }

    public void setEventCode(String eventCode) {
        this.eventCode = eventCode;
    }

    public Long getRfbLocationId() {
        return rfbLocationId;
    }

    public void setRfbLocationId(Long rfbLocationId) {
        this.rfbLocationId = rfbLocationId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RfbEventDTO)) {
            return false;
        }

        return id != null && id.equals(((RfbEventDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "RfbEventDTO{" +
            "id=" + getId() +
            ", eventDate='" + getEventDate() + "'" +
            ", eventCode='" + getEventCode() + "'" +
            ", rfbLocationId=" + getRfbLocationId() +
            "}";
    }
}
