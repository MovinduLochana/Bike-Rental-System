package lk.pgn265.bikerentalrideshare.repo;

import lk.pgn265.bikerentalrideshare.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepo extends JpaRepository<Payment, Integer> {

    @Query("SELECT p FROM Payment p JOIN Ride r ON p.ride.id = r.id WHERE r.user.id = :id")
    List<Payment> findPaymentByUserId(int id);

    List<Payment> findAllByRideId(int id);
}
