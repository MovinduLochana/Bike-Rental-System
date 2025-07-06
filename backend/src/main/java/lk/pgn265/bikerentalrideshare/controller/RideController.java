package lk.pgn265.bikerentalrideshare.controller;

import lk.pgn265.bikerentalrideshare.Algorithms.Queue;
import lk.pgn265.bikerentalrideshare.enums.RideStatus;
import lk.pgn265.bikerentalrideshare.model.Ride;
import lk.pgn265.bikerentalrideshare.projection.RideProjection;
import lk.pgn265.bikerentalrideshare.repo.RideRepo;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController @RequestMapping("/rides")
public class RideController {

    private final RideRepo rides;
    private final Queue<Ride> rideQueue;

    public RideController(RideRepo rides, Queue<Ride> rideQueue) {
        this.rides = rides;
        this.rideQueue = rideQueue;
    }

    @GetMapping
    public ResponseEntity<List<RideProjection>> getAllRide() {
        return ResponseEntity.ok(
                rideQueue.getAll()
                        .stream()
                        .map(ride -> rides.findRideProjectionById(ride.getId()))
                        .toList()
        );
    }

    @GetMapping("/complete/{id}")
    public ResponseEntity<Void> completeRide(@PathVariable int id) {

        if(rideQueue.dequeue().getId() != id){
            System.err.println("Ride ID mismatch");
        }

        return ResponseEntity.ok().build();
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<RideProjection>> getUserRides(@PathVariable int id) {
        return ResponseEntity.ok(rides.findRideProjectionByUserId(id));
    }

    @GetMapping("/user/{id}/done")
    public ResponseEntity<List<Ride>> getAllFinishedRides(@PathVariable int id) {
        return ResponseEntity.ok(rides.findAllByUserIdAndStatus(id, RideStatus.COMPLETED));
    }

    @GetMapping("/user/{id}/ongoing")
    public ResponseEntity<List<Ride>> getAllOngoingRides(@PathVariable int id) {
        return ResponseEntity.ok(rides.findAllByUserIdAndStatus(id, RideStatus.ONGOING));
    }

    @PostMapping("/create")
    public ResponseEntity<Integer> createRide(@RequestBody Ride ride) {
//        ride.getBike().setAvailability();
        ride.setStatus(RideStatus.PENDING_PAYMENT);
        rideQueue.enqueue(ride);

        return ResponseEntity.ok(rides.save(ride).getId());
    }

}
