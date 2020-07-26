package com.rfb.service.dto;

import java.io.Serializable;

/**
 * A DTO for the {@link com.rfb.domain.RfbUser} entity.
 */
public class RfbUserDTO implements Serializable {

    private Long id;

    private String username;


    private RfbLocationDTO rfbLocationDTO;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public RfbLocationDTO getRfbLocationDTO() {
        return rfbLocationDTO;
    }

    public void setRfbLocationDTO(RfbLocationDTO rfbLocationDTO) {
        this.rfbLocationDTO = rfbLocationDTO;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RfbUserDTO)) {
            return false;
        }

        return id != null && id.equals(((RfbUserDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "RfbUserDTO{" +
            "id=" + getId() +
            ", username='" + getUsername() + "'" +
            ", homeLocationId=" + getRfbLocationDTO() +
            "}";
    }
}
