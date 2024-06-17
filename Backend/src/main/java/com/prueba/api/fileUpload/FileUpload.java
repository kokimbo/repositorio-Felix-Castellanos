package com.prueba.api.fileUpload;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RequiredArgsConstructor
public class FileUpload {

    private static final String UPLOAD_DIR = "fotos/fotosUsuario/";

    public static String uploadFile(MultipartFile file) {
        if (file.isEmpty()) {
            return null;
        }

        try {
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String nomFoto = file.getOriginalFilename();
            String[] partes = nomFoto.split("\\.");
            String nomNuevo = UUID.randomUUID().toString() + UUID.randomUUID().toString() + "." + partes[partes.length - 1];

            Path filePath = uploadPath.resolve(nomNuevo);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            return nomNuevo;
        } catch (IOException e) {
            return null;
        }
    }
}
