package lk.pgn265.bikerentalrideshare.controller;

import lk.pgn265.bikerentalrideshare.dto.PaymentRequest;
import lk.pgn265.bikerentalrideshare.enums.BikeAvailability;
import lk.pgn265.bikerentalrideshare.enums.PaymentStatus;
import lk.pgn265.bikerentalrideshare.enums.RideStatus;
import lk.pgn265.bikerentalrideshare.model.Payment;
import lk.pgn265.bikerentalrideshare.repo.BikeRepo;
import lk.pgn265.bikerentalrideshare.repo.PaymentRepo;
import lk.pgn265.bikerentalrideshare.repo.RideRepo;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController @RequestMapping("/payments")
public class PaymentController {

    private final PaymentRepo payments;
    private final RideRepo rides;
    private final BikeRepo bikes;


    public PaymentController(PaymentRepo payments, RideRepo rides, BikeRepo bikes) {
        this.payments = payments;
        this.rides = rides;
        this.bikes = bikes;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Payment> getPayment(@PathVariable int id) {
        return payments.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/process")
    public ResponseEntity<Payment> processPayment(@RequestBody Payment payment) {


        var ride = rides.findById(payment.getRide().getId()).orElseThrow();
        ride.setStatus(RideStatus.ONGOING);

        var bike = ride.getBike();
        bike.setAvailability(BikeAvailability.RENTED);
        bikes.save(bike);

        payment.setRide(ride);
        payment.setStatus(PaymentStatus.COMPLETED);

        System.out.println(payment);

        return ResponseEntity.ok(payments.save(payment));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Payment>> getUserPayments(@PathVariable int userId) {
        return ResponseEntity.ok(payments.findAllByRideId(userId));
    }

    @PostMapping("/create")
    public ResponseEntity<Payment> createPayment(@RequestBody PaymentRequest pr) {
        return ResponseEntity.ok(payments.save(pr.mapBuilder()));
    }

}
