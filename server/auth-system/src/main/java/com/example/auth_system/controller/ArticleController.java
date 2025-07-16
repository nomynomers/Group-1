package com.example.auth_system.controller;

import com.example.auth_system.dto.ArticleDTO;
import com.example.auth_system.dto.ArticleRequest;
import com.example.auth_system.dto.ArticleResponse;
import com.example.auth_system.entity.Article;
import com.example.auth_system.service.ArticleService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class ArticleController {

    private final ArticleService articleService;

    //
    @GetMapping
    public ResponseEntity<List<ArticleResponse>> getAll() {
        return ResponseEntity.ok(articleService.getAll());
    }

    //
    @GetMapping("/{id}")
    public ResponseEntity<ArticleResponse> getById(@PathVariable int id) {
        return ResponseEntity.ok(articleService.getById(id));
    }

    //
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ArticleResponse> create(@RequestBody ArticleRequest request) {
        return ResponseEntity.ok(articleService.create(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ArticleResponse> update(@PathVariable int id, @RequestBody ArticleRequest request) {
        return ResponseEntity.ok(articleService.update(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> delete(@PathVariable int id) {
        articleService.delete(id);
        return ResponseEntity.ok("Deleted successfully");
    }

    @GetMapping("/top3")
    public List<ArticleDTO> getTop3Articles() {
        List<Article> articles = articleService.getTop3Articles();

        return articles.stream()
                .map(article -> ArticleDTO.builder()
                        .id(article.getArticleID())
                        .title(article.getArticleName())
                        .category(article.getCategory())
                        .date(article.getCreationDate().format(DateTimeFormatter.ofPattern("MMMM dd, yyyy")))
                        .readTime(article.getDurationMinutes() + " min read")
                        .image(article.getImageCover())
                        .build()
                )
                .collect(Collectors.toList());
    }
}

