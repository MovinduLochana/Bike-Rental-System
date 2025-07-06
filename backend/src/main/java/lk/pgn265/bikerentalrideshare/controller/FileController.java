package lk.pgn265.bikerentalrideshare.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/images")
public class FileController {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @GetMapping("/{context}/{filename:.+}")
    public ResponseEntity<Resource> getImage(@PathVariable String context, @PathVariable String filename) {

        try {
            Path filePath = Paths.get(uploadDir).resolve(context).resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists()) {

                String contentType = determineContentType(filename);

                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType))
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                System.out.println(filePath);
                return ResponseEntity.status(HttpStatus.FOUND)
                        .header(HttpHeaders.LOCATION, "https://ui-avatars.com/api/?name=bike&size=512")
                        .build();
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    private String determineContentType(String filename) {
        String extension = filename.substring(filename.lastIndexOf(".") + 1).toLowerCase();
        return switch (extension) {
            case "jpg", "jpeg" -> "image/jpeg";
            case "png" -> "image/png";
            case "gif" -> "image/gif";
            case "webp" -> "image/webp";
            default -> "application/octet-stream";
        };
    }
/*
*
*             // Generate unique filename

//            String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());
//            String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
//
//            String filename = UUID.randomUUID() + fileExtension;
//
//            // Save the file
//            Path filePath = uploadPath.resolve(filename);
//            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
* */
    //                // Determine content type
//                String contentType = determineContentType(filename);
//
//                // Verify it's an image type
//                if (!contentType.startsWith("image/")) {
//                    return ResponseEntity.badRequest().body(null);
//                }

//    ResponseEntity.ok()
//            //.contentType(MediaType.parseMediaType(contentType))
//            .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
//            .body(resource)

}