package com.example.FlashQuiz;

import com.example.FlashQuiz.parser.InitialDataPusher;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.core.mapping.event.ValidatingMongoEventListener;

@SpringBootApplication
public class FlashQuizApplication {

	public static void main(String[] args){

		SpringApplication.run(FlashQuizApplication.class, args);

	}

}
