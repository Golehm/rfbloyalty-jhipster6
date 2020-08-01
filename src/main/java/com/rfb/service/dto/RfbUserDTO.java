package com.rfb.service.dto;

import java.io.Serializable;

/**
 * A DTO for the {@link com.rfb.domain.RfbUser} entity.
 */
public class RfbUserDTO implements Serializable {
    
    private Long id;

    private String username;


    private Long homeLocationId;

    private Long userId;

    private String userLogin;
    
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

    public Long getHomeLocationId() {
        return homeLocationId;
    }

    public void setHomeLocationId(Long rfbLocationId) {
        this.homeLocationId = rfbLocationId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserLogin() {
        return userLogin;
    }

    public void setUserLogin(String userLogin) {
        this.userLogin = userLogin;
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
            ", homeLocationId=" + getHomeLocationId() +
            ", userId=" + getUserId() +
            ", userLogin='" + getUserLogin() + "'" +
            "}";
    }
}
