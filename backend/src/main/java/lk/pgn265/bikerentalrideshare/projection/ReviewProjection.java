package lk.pgn265.bikerentalrideshare.projection;

import java.time.LocalDateTime;

public interface ReviewProjection {
    int getId();
    String getTitle();
    String getContent();
    float getRating();
    String getPros();
    String getCons();
    LocalDateTime getCreatedTime();

    UserInfoProjection getUser();
    BikeInfoProjection getBike();

}
