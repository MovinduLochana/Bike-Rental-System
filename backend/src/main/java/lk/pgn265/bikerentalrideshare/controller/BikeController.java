package lk.pgn265.bikerentalrideshare.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lk.pgn265.bikerentalrideshare.Algorithms.QuickSort;
import lk.pgn265.bikerentalrideshare.enums.BikeAvailability;
import lk.pgn265.bikerentalrideshare.enums.BikeType;
import lk.pgn265.bikerentalrideshare.model.Bike;
import lk.pgn265.bikerentalrideshare.model.Review;
import lk.pgn265.bikerentalrideshare.projection.BikeViewDataProjection;
import lk.pgn265.bikerentalrideshare.repo.BikeRepo;
import lk.pgn265.bikerentalrideshare.repo.ReviewRepo;
import lk.pgn265.bikerentalrideshare.service.FileStorageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController @RequestMapping("/bikes")
public class BikeController {

    private final BikeRepo bikes;
    private final ReviewRepo reviews;

    private final QuickSort quickSort;

    private final FileStorageService fileStorageService;

    public BikeController(BikeRepo bikes, ReviewRepo reviews, QuickSort quickSort, FileStorageService fileStorageService) {
        this.bikes = bikes;
        this.reviews = reviews;
        this.quickSort = quickSort;
        this.fileStorageService = fileStorageService;
    }

    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Bike> addBike(@RequestBody Bike bike) {
        return ResponseEntity.ok(bikes.save(bike));
    }

    @PostMapping
    public ResponseEntity<Bike> createBike(
            @RequestParam String name,
            @RequestParam String model,
            @RequestParam double pricePerDay,
            @RequestParam String bikeType,
            @RequestParam String availability,
            @RequestParam String engineCapacity,
            @RequestParam String fuelCapacity,
            @RequestParam String description,
            @RequestParam String features,
            @RequestParam String specifications,
            @RequestParam MultipartFile image
    ) throws JsonProcessingException {
            // Parse JSON strings
            ObjectMapper mapper = new ObjectMapper();
            String[] featuresMapped = mapper.readValue(features, String[].class);
            Map<String, String> specificationsMapped = mapper.readValue(specifications, new TypeReference<Map<String, String>>() {});

            // Process image if provided
            String imageUrl = null;
            if (image != null && !image.isEmpty()) {
                imageUrl = fileStorageService.storeFile(image, FileStorageService.StorageContext.BIKE);
            }

            Bike bikeDto = new Bike();
            bikeDto.setName(name);
            bikeDto.setModel(model);
            bikeDto.setPricePerDay(pricePerDay);
            bikeDto.setBikeType(BikeType.valueOf(bikeType));
            bikeDto.setAvailability(BikeAvailability.valueOf(availability));
            bikeDto.setEngineCapacity(engineCapacity);
            bikeDto.setFuelCapacity(fuelCapacity);
            bikeDto.setDescription(description);
            bikeDto.setRating(0);
            bikeDto.setReviewCount((byte) 0);
            bikeDto.setFeatures(featuresMapped);
            bikeDto.setSpecifications(specificationsMapped);
            bikeDto.setImage(imageUrl);


            Bike savedBike = bikes.save(bikeDto);

            return ResponseEntity.status(HttpStatus.CREATED).body(savedBike);
    }

    @GetMapping
    public ResponseEntity<BikeViewDataProjection[]> getAllBikes() {

        var allBikes = bikes.findAllProjectedBy().toArray(new BikeViewDataProjection[0]);
        quickSort.sortBikes(allBikes);

        return ResponseEntity.ok(allBikes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Bike> getBike(@PathVariable int id) {
        return ResponseEntity.ok(bikes.findById(id).orElse(new Bike()));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Bike>> getAllBikeData() {
        return ResponseEntity.ok(bikes.findAll());
    }

    @GetMapping("/search")
    public ResponseEntity<List<BikeViewDataProjection>> searchBikes(@RequestParam String name, @RequestParam Optional<BikeType> type, @RequestParam Optional<BikeAvailability> availability) {

        if (type.isPresent() && availability.isPresent()) {
            return ResponseEntity.ok(bikes.findBikeViewDataProjectionByNameContainingIgnoreCaseAndBikeTypeAndAvailability(name, type.get(), availability.get()));
        } else if (type.isPresent()) {
            return ResponseEntity.ok(bikes.findBikeViewDataProjectionByNameContainingIgnoreCaseAndBikeType(name, type.get()));
        } else if (availability.isPresent()) {
            return ResponseEntity.ok(bikes.findBikeViewDataProjectionByNameContainingIgnoreCaseAndAvailability(name, availability.get()));
        }

        return ResponseEntity.ok(bikes.findBikeViewDataProjectionByNameContainingIgnoreCase(name));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Bike> updateBike(@PathVariable int id, @RequestBody Bike bike) {
        if(bikes.findById(id).isEmpty()) return ResponseEntity.of(ProblemDetail.forStatus(HttpStatus.NOT_FOUND)).build();
        return ResponseEntity.ok(bikes.save(bike));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBike(@PathVariable int id) {
        bikes.deleteById(id);
        return ResponseEntity.ok("Deleted");
    }
    @GetMapping("/available")
    public ResponseEntity<List<Bike>> getAvailableBikes() {
//        return ResponseEntity.ok(bikes.findAllByStatus("AVAILABLE"));
        return ResponseEntity.ok(bikes.findAll());
    }

    @GetMapping("/{id}/reviews")
    public ResponseEntity<List<Review>> getBikeReviews(@PathVariable int id) {
        if (!bikes.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(reviews.findAllByBikeId(id));
    }

//    @GetMapping("/sorted")
//    public ResponseEntity<Bike[]> getSortedBikes(){
//        Bike[] bikeArray = bikes.findAll().toArray(new Bike[0]);
//        quickSort.sortBikes(bikeArray);
//        return ResponseEntity.ok(bikeArray);
//    }
}
