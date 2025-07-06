package lk.pgn265.bikerentalrideshare.dto;

public record PasswordChange(
        int id,
        String oldPassword,
        String newPassword
) {
}
