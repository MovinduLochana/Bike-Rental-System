package lk.pgn265.bikerentalrideshare.projection;

import lk.pgn265.bikerentalrideshare.enums.BikeAvailability;
import lk.pgn265.bikerentalrideshare.enums.BikeType;

public interface BikeViewDataProjection {
    int getId();
    String getName();
    String getModel();
    String getImage();
    float getPricePerDay();
    BikeAvailability getAvailability();
    BikeType getBikeType();
    String getEngineCapacity();
    double getRating();
    byte getReviewCount();
}
