package lk.pgn265.bikerentalrideshare.model;

import jakarta.persistence.*;
import lk.pgn265.bikerentalrideshare.enums.PaymentStatus;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int transactionId;

    private double amount;
    private String paymentMethod;

    @CreationTimestamp
    private LocalDateTime timestamp;

    @OneToOne
    @JoinColumn(nullable = false)
    private Ride ride;

    @Enumerated(EnumType.STRING)
    private PaymentStatus status;

    public Payment() {
    }

    public void setTransactionId(int id) {
        this.transactionId = id;
    }

    public Ride getRide() {
        return ride;
    }

    public void setRide(Ride ride) {
        this.ride = ride;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public PaymentStatus getStatus() {
        return status;
    }

    public void setStatus(PaymentStatus status) {
        this.status = status;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public int getTransactionId() {
        return transactionId;
    }

    @Override
    public String toString() {
        return "Payment{" +
                "transactionId=" + transactionId +
                ", amount=" + amount +
                ", paymentMethod='" + paymentMethod + '\'' +
                ", timestamp=" + timestamp +
                ", ride=" + ride +
                ", status=" + status +
                '}';
    }
}
