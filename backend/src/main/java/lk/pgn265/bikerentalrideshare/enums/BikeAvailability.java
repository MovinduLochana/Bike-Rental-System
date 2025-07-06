package lk.pgn265.bikerentalrideshare.enums;

public enum BikeAvailability {
    AVAILABLE(0),
    RENTED(1),
    MAINTENANCE(2),
    UNAVAILABLE(3);

    public final int value;

    BikeAvailability(int value) {
        this.value = value;
    }
}

