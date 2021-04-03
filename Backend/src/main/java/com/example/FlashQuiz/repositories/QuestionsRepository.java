package com.example.FlashQuiz.repositories;

import com.example.FlashQuiz.models.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// Database interface
@Repository
public interface QuestionsRepository extends JpaRepository<Question, Integer> {
}

