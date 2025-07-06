package lk.pgn265.bikerentalrideshare.projection;

import lk.pgn265.bikerentalrideshare.enums.RideStatus;

import java.time.LocalDateTime;

public interface RideProjection {
    int getId();
    RideStatus getStatus();
    LocalDateTime getStartTime();
    LocalDateTime getEndTime();
    BikeInfoProjection getBike();
}
