package com.example.auth_system.dto;

import com.example.auth_system.entity.Article;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ArticleResponse {
    private int articleID;
    private String articleName;
    private String description;
    private String category;
    private int durationMinutes;
    private LocalDateTime creationDate;
    private String imageCover;
    private String content;
    private String authorName;

    public static ArticleResponse fromEntity(Article article) {
        return ArticleResponse.builder()
                .articleID(article.getArticleID())
                .articleName(article.getArticleName())
                .description(article.getDescription())
                .category(article.getCategory())
                .durationMinutes(article.getDurationMinutes())
                .creationDate(article.getCreationDate())
                .imageCover(article.getImageCover())
                .content(article.getContent())
                .authorName(article.getCreatedBy().getFirstName() + " " + article.getCreatedBy().getLastName())
                .build();
    }
}
