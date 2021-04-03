package com.example.FlashQuiz.controllers;

import com.example.FlashQuiz.models.Question;
import com.example.FlashQuiz.repositories.QuestionsRepository;
import com.example.FlashQuiz.services.QuestionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Rest APIs implementation

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class QuestionsController {

    @Autowired
    QuestionsService questionsService;

    @Autowired
    QuestionsRepository repository;

//    API to get all questions list
    @GetMapping(path = "/")
    public List<Question> getAll() {
        return repository.findAll();
    }

//    API to get a single question
    @GetMapping (path = "/getQuestion")
    public Question getQuestion() {
        return questionsService.getQuestion();
    }

//    API to update the attempt of question based on incorrect attempt or timer
    @PutMapping(path = "/getQuestion")
    public void updateAttempt(@RequestParam(name = "answered") boolean isAnswered, @RequestParam(name= "timer") boolean
                              timer) {
        questionsService.updateQuestion(isAnswered, timer);
    }

}
