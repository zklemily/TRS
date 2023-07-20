package com.project.trs.dto;

import java.math.BigDecimal;
import java.sql.Timestamp;

public class ReservationRequest {
    private int userId;
    private int guestId;
    private int courtId;
    private int courtTypeId;
    private Timestamp startTime;
    private Timestamp endTime;
    private BigDecimal price;

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getGuestId() {
        return guestId;
    }

    public void setGuestId(int guestId) {
        this.guestId = guestId;
    }

    public int getCourtId() {
        return courtId;
    }

    public void setCourtId(int courtId) {
        this.courtId = courtId;
    }

    public int getCourtTypeId() {
        return courtTypeId;
    }

    public void setCourtTypeId(int courtTypeId) {
        this.courtTypeId = courtTypeId;
    }

    public Timestamp getStartTime() {
        return startTime;
    }

    public void setStartTime(Timestamp startTime) {
        this.startTime = startTime;
    }

    public Timestamp getEndTime() {
        return endTime;
    }

    public void setEndTime(Timestamp endTime) {
        this.endTime = endTime;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }
}
