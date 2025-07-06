package lk.pgn265.bikerentalrideshare.dto;

import lk.pgn265.bikerentalrideshare.model.User;

public record UserResponse(
        int id,
        String name,
        String email,
        String address,
        String phone
) {
    public static UserResponse mapper(User user){

        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getAddress(),
                user.getPhone()
        );
    }
}
