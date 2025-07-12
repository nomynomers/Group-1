package com.example.auth_system.service;

import com.example.auth_system.dto.ArticleRequest;
import com.example.auth_system.dto.ArticleResponse;
import com.example.auth_system.entity.Article;
import com.example.auth_system.entity.User;
import com.example.auth_system.repository.ArticleRepository;
import com.example.auth_system.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ArticleService {
    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;

    public ArticleResponse create(ArticleRequest request) {
        User user = userRepository.findById(request.getCreatedBy())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Article article = Article.builder()
                .createdBy(user)
                .articleName(request.getArticleName())
                .description(request.getDescription())
                .category(request.getCategory())
                .durationMinutes(request.getDurationMinutes())
                .creationDate(LocalDateTime.now())
                .imageCover(request.getImageCover())
                .content(request.getContent())
                .build();

        return ArticleResponse.fromEntity(articleRepository.save(article));
    }

    public List<ArticleResponse> getAll() {
        return articleRepository.findAll().stream()
                .map(ArticleResponse::fromEntity)
                .toList();
    }

    public ArticleResponse getById(int id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article not found"));
        return ArticleResponse.fromEntity(article);
    }

    public ArticleResponse update(int id, ArticleRequest request) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article not found"));

        article.setArticleName(request.getArticleName());
        article.setDescription(request.getDescription());
        article.setCategory(request.getCategory());
        article.setDurationMinutes(request.getDurationMinutes());
        article.setImageCover(request.getImageCover());
        article.setContent(request.getContent());

        return ArticleResponse.fromEntity(articleRepository.save(article));
    }

    public void delete(int id) {
        articleRepository.deleteById(id);
    }
}
