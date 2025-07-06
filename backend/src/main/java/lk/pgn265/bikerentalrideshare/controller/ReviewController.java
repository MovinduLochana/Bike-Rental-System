package lk.pgn265.bikerentalrideshare.controller;

import lk.pgn265.bikerentalrideshare.dto.BikeReview;
import lk.pgn265.bikerentalrideshare.model.Review;
import lk.pgn265.bikerentalrideshare.projection.ReviewProjection;
import lk.pgn265.bikerentalrideshare.repo.ReviewRepo;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController @RequestMapping("/reviews")
public class ReviewController {

    private final ReviewRepo reviews;

    public ReviewController(ReviewRepo reviews) {
        this.reviews = reviews;
    }

    @GetMapping
    public ResponseEntity<List<ReviewProjection>> allReviews() {
        return ResponseEntity.ok(reviews.findAllProjections());
    }

    @PostMapping
    public ResponseEntity<Review> addReview(@RequestBody Review review) {
        return ResponseEntity.ok(reviews.save(review));
    }

    @GetMapping("bike/{id}")
    public ResponseEntity<List<BikeReview>> getAllBikeReviews(@PathVariable int id) {
        return ResponseEntity.ok(reviews.findAllByBikeId(id).stream().map(BikeReview::mapper).toList());
    }

    @GetMapping("user/{id}")
    public ResponseEntity<List<BikeReview>> getAllUserReviews(@PathVariable int id) {
        return ResponseEntity.ok(reviews.findByUserId(id).stream().map(BikeReview::mapper).toList());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteReview(@PathVariable int id) {
        reviews.deleteById(id);
        return ResponseEntity.ok("Deleted");
    }
}
