package lk.pgn265.bikerentalrideshare.dto;

import lk.pgn265.bikerentalrideshare.enums.PaymentStatus;
import lk.pgn265.bikerentalrideshare.model.Payment;
import lk.pgn265.bikerentalrideshare.model.Ride;

public record PaymentRequest(
        Ride ride, double amount, String paymentMethod, int cardNumber, String expiryDate, String cvv
) {
    public Payment mapBuilder() {
        var payment = new Payment();
        payment.setRide(ride);
        payment.setAmount(amount);
        payment.setPaymentMethod(paymentMethod);
        payment.setStatus(PaymentStatus.COMPLETED);
        return payment;
    }

}
