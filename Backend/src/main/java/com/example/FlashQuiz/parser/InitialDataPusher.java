package com.example.FlashQuiz.parser;

import java.io.FileReader;
import java.sql.Timestamp;
import java.util.Random;
import com.example.FlashQuiz.controllers.QuestionsController;
import com.example.FlashQuiz.models.Question;
import com.example.FlashQuiz.services.QuestionsService;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Component;

// Service that parses the data and load in to database.

@Component
public class InitialDataPusher {

    @Autowired
    QuestionsService service;

    public void loadData() {

        try {
            Object obj = new JSONParser().parse(new FileReader("/Users/prathma/Documents/FlashQuiz/quiz.json"));

            QuestionsController qc = new QuestionsController();

            JSONArray questions = (JSONArray) obj;
            for (int i = 0; i < 50; ++i) {
                JSONObject ques = (JSONObject) questions.get(i);
                String que = (String) ques.get("question");
                String dis1 = (String) ques.get("distractor1");
                String dis2 = (String) ques.get("distractor2");
                String dis3 = (String) ques.get("distractor3");
                String answer = (String) ques.get("correct_answer");

                // random date of creation allotted
                long offset = Timestamp.valueOf("2020-03-01 00:00:00").getTime();
                long end = Timestamp.valueOf("2021-03-21 00:00:00").getTime();
                long diff = end - offset + 1;
                Timestamp createdAt = new Timestamp(offset + (long) (Math.random() * diff));

                // Random time for answering between 25 secs to 50 secs allotted to each question
                Random rand = new Random();
                int min = 5, max = 10;
                int timeAlloted = 5* (rand.nextInt(max - min + 1) + min);
                Question question = new Question(que, dis1, dis2, dis3, answer, createdAt, 0, 0, timeAlloted);
                service.saveQuestion(question);

            }
            service.addQuestion();
        } catch(Exception e) {
            e.printStackTrace();
        }

    }
}
