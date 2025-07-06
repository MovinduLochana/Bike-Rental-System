package lk.pgn265.bikerentalrideshare.model;

import jakarta.persistence.*;
import lk.pgn265.bikerentalrideshare.enums.BikeAvailability;
import lk.pgn265.bikerentalrideshare.enums.BikeType;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.List;
import java.util.Map;

@Entity
public class Bike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String model;
    private float rating;
    private byte reviewCount;
    private String fuelCapacity;
    private double pricePerDay;
    private String image;
    private String engineCapacity;

    @Column(length = 512)
    private String description;

    @Enumerated(EnumType.STRING)
    private BikeAvailability availability;

    @Enumerated(EnumType.STRING)
    private BikeType bikeType;

    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String, String> specifications;

    @JdbcTypeCode(SqlTypes.ARRAY)
    private String[] features;

    @OneToMany(mappedBy = "bike", cascade = CascadeType.REMOVE, fetch = FetchType.EAGER, orphanRemoval = true)
    List<Review> reviews;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public float getRating() {
        return rating;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public byte getReviewCount() {
        return reviewCount;
    }

    public void setReviewCount(byte reviewCount) {
        this.reviewCount = reviewCount;
    }

    public String getFuelCapacity() {
        return fuelCapacity;
    }

    public void setFuelCapacity(String fuelCapacity) {
        this.fuelCapacity = fuelCapacity;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPricePerDay() {
        return pricePerDay;
    }

    public void setPricePerDay(double pricePerDay) {
        this.pricePerDay = pricePerDay;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public BikeAvailability getAvailability() {
        return availability;
    }

    public void setAvailability(BikeAvailability availability) {
        this.availability = availability;
    }

    public BikeType getBikeType() {
        return bikeType;
    }

    public void setBikeType(BikeType bikeType) {
        this.bikeType = bikeType;
    }

    public Map<String, String> getSpecifications() {
        return specifications;
    }

    public void setSpecifications(Map<String, String> specifications) {
        this.specifications = specifications;
    }

    public String[] getFeatures() {
        return features;
    }

    public void setFeatures(String[] features) {
        this.features = features;
    }

    public String getEngineCapacity() {
        return engineCapacity;
    }

    public void setEngineCapacity(String engineCapacity) {
        this.engineCapacity = engineCapacity;
    }

    @Override
    public String toString() {
        return "Bike{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", availability=" + availability +
                '}';
    }
}