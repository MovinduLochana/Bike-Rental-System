package lk.pgn265.bikerentalrideshare.repo;

import lk.pgn265.bikerentalrideshare.model.Bike;
import lk.pgn265.bikerentalrideshare.enums.BikeAvailability;
import lk.pgn265.bikerentalrideshare.enums.BikeType;
import lk.pgn265.bikerentalrideshare.projection.BikeViewDataProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BikeRepo extends JpaRepository<Bike, Integer> {

    List<BikeViewDataProjection> findBikeViewDataProjectionByNameContainingIgnoreCase(String search);
    List<BikeViewDataProjection> findBikeViewDataProjectionByNameContainingIgnoreCaseAndBikeType(String search, BikeType type);
    List<BikeViewDataProjection> findBikeViewDataProjectionByNameContainingIgnoreCaseAndAvailability(String name, BikeAvailability availability);
    List<BikeViewDataProjection> findBikeViewDataProjectionByNameContainingIgnoreCaseAndBikeTypeAndAvailability(String name, BikeType bikeType, BikeAvailability availability);

    List<BikeViewDataProjection> findAllProjectedBy();
}
