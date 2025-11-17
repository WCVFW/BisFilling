package com.calzone.financial.storage;

import org.springframework.web.multipart.MultipartFile;

/**
 * Interface for file storage operations.
 * This abstracts the file-saving mechanism, allowing for different
 * implementations (e.g., local disk, S3, etc.).
 */
public interface FileStorageService {

    /**
     * Stores a file provided as a MultipartFile.
     *
     * @param file the file to store
     * @return the web-accessible path to the stored file
     * @throws IllegalArgumentException if the file is invalid
     * @throws RuntimeException         if storage fails
     */
    String store(MultipartFile file);

    /**
     * Initializes the storage.
     * This is intended to be called on application startup
     * to create necessary directories.
     */
    void init();

    // You could add other methods here as needed, e.g.:
    // Resource loadAsResource(String filename);
    // void delete(String filename);
}