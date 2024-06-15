package com.prueba.api.fileUpload;

import java.io.File;

public class FileRemover {
    public static void deleteFile(String fileName) {
        String folderPath = System.getProperty("user.dir") + "/userProfilePics/";
        String filePath = folderPath + fileName;

        File file = new File(filePath);
        if (file.exists()) {
            if (file.delete()) {
                System.out.println("Archivo eliminado correctamente.");
            } else {
                System.out.println("No se pudo eliminar el archivo.");
            }
        } else {
            System.out.println("El archivo no existe.");
        }
    }
}
