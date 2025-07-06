package lk.pgn265.bikerentalrideshare.dto;

import lk.pgn265.bikerentalrideshare.model.Review;

public record BikeReview(
        int id,

        float rating,
        String title,
        String content,

        int bikeId,
        String bikeName,
        String bikeModel,

        String userName,
        String userAvatar
) {

    public static BikeReview mapper(Review review) {
        return new BikeReview(
                review.getId(),

                review.getRating(),
                review.getTitle(),
                review.getContent(),

                review.getBike().getId(),
                review.getBike().getName(),
                review.getBike().getModel(),

                review.getUser().getName(),
                review.getUser().getAvatar()
        );
    }

}
