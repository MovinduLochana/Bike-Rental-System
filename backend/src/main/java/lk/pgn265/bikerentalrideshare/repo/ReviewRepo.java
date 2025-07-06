package lk.pgn265.bikerentalrideshare.repo;

import lk.pgn265.bikerentalrideshare.model.Review;
import lk.pgn265.bikerentalrideshare.projection.ReviewProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepo extends JpaRepository<Review, Integer> {

    List<Review> findByUserId(int userId);

    List<Review> findAllByBikeId(int bikeId);

    @Query(value = "SELECT r FROM Review r")
    List<ReviewProjection> findAllProjections();
}
