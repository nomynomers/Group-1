package com.example.auth_system.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ArticleDTO {
    private int id;
    private String title;
    private String category;
    private String date;
    private String readTime;
    private String image;
}

