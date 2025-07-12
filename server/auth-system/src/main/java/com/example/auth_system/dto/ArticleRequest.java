package com.example.auth_system.dto;

import lombok.Data;

@Data
public class ArticleRequest {
    private int createdBy;
    private String articleName;
    private String description;
    private String category;
    private int durationMinutes;
    private String imageCover;
    private String content;
}
