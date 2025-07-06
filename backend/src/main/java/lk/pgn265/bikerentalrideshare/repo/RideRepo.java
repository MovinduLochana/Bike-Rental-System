package lk.pgn265.bikerentalrideshare.repo;

import lk.pgn265.bikerentalrideshare.enums.RideStatus;
import lk.pgn265.bikerentalrideshare.model.Ride;
import lk.pgn265.bikerentalrideshare.projection.RideProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RideRepo extends JpaRepository<Ride, Integer> {

    List<Ride> findAllByUserIdAndStatus(int id, RideStatus status);
    List<Ride> findRideByUserId(int userId);

    RideProjection findRideProjectionById(int id);

    List<RideProjection> findRideProjectionByUserId(int userId);
    List<RideProjection> findRideProjectionsByUserIdAndStatus(int userId, RideStatus status);
}
