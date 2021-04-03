package com.example.FlashQuiz;

import com.example.FlashQuiz.parser.InitialDataPusher;
import com.example.FlashQuiz.repositories.QuestionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

// Custom runner to associate InitialDataPusher with Spring Application
@Component
public class MyAppRunner implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(MyAppRunner.class);

    @Autowired
    InitialDataPusher idp;

    @Override
    public void run(String... args) throws Exception {
//        InitialDataPusher idp = new InitialDataPusher();
        idp.loadData();

    }
}
