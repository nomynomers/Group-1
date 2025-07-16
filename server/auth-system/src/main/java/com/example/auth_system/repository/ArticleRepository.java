package com.example.auth_system.repository;

import com.example.auth_system.entity.Article;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ArticleRepository extends JpaRepository<Article, Integer> {
    @Query("SELECT a FROM Article a ORDER BY a.creationDate DESC")
    List<Article> findTopArticles(Pageable pageable);
}
