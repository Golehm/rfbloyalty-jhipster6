package com.rfb.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A RfbEventAttendance.
 */
@Entity
@Table(name = "rfb_event_attendance")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class RfbEventAttendance implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "attendance_date")
    private LocalDate attendanceDate;

    @OneToOne
    @JoinColumn(unique = true)
    private RfbUser rfbUser;

    @ManyToOne
    @JsonIgnoreProperties(value = "rfbEventAttendances", allowSetters = true)
    private RfbEvent rfbEvent;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getAttendanceDate() {
        return attendanceDate;
    }

    public RfbEventAttendance attendanceDate(LocalDate attendanceDate) {
        this.attendanceDate = attendanceDate;
        return this;
    }

    public void setAttendanceDate(LocalDate attendanceDate) {
        this.attendanceDate = attendanceDate;
    }

    public RfbUser getRfbUser() {
        return rfbUser;
    }

    public RfbEventAttendance rfbUser(RfbUser rfbUser) {
        this.rfbUser = rfbUser;
        return this;
    }

    public void setRfbUser(RfbUser rfbUser) {
        this.rfbUser = rfbUser;
    }

    public RfbEvent getRfbEvent() {
        return rfbEvent;
    }

    public RfbEventAttendance rfbEvent(RfbEvent rfbEvent) {
        this.rfbEvent = rfbEvent;
        return this;
    }

    public void setRfbEvent(RfbEvent rfbEvent) {
        this.rfbEvent = rfbEvent;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RfbEventAttendance)) {
            return false;
        }
        return id != null && id.equals(((RfbEventAttendance) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "RfbEventAttendance{" +
            "id=" + getId() +
            ", attendanceDate='" + getAttendanceDate() + "'" +
            "}";
    }
}
