package com.example.FlashQuiz.services;

import com.example.FlashQuiz.models.Question;
import com.example.FlashQuiz.repositories.QuestionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

// Service that handles all the operations required for algorithm to perform

@Service
public class QuestionsService {

    @Autowired
    QuestionsRepository questionsRepository;

    List<Question> allQuestionsData;

    PriorityQueue<Question> queue;

    // Priority Queue, priority of object is according to the algorithm below.
    class QuestionComparator implements Comparator<Question> {
        @Override
        public int compare(Question a, Question b) {
            double score1 = 1;

            // if the question never shown
            if (a.getAskedFreq() == 0) {
                score1 *= a.getTimeAlloted();
            } else {
                // if question never answered wrong
                if (a.getIncorrectAttempts() == 0) {
                    // question with greater time and less frequently shown will be prior because it will be more difficult.
                    score1 = score1 * a.getTimeAlloted() / (double) a.getAskedFreq();
                } else {
                    // question answered wrong once or more
                    // question with less frequently shown, greater time and greater number of wrong attempts will be more difficult

                    score1 = score1 * a.getTimeAlloted() * a.getIncorrectAttempts() / a.getAskedFreq();
                }
            }

            double score2 = 1;

            // if the question never shown
            if (b.getAskedFreq() == 0) {
                // if question never answered wrong
                score2 *= b.getTimeAlloted();
            } else {
                // if question never answered wrong

                if (b.getIncorrectAttempts() == 0) {
                    // question with greater time and less frequently shown will be prior because it will be more difficult.

                    score2 = score2 * b.getTimeAlloted() / (double) b.getAskedFreq();
                } else {
                    // question answered wrong once or more
                    // question with less frequently shown, greater time and greater number of wrong attempts will be more difficult

                    score2 = score2 * b.getTimeAlloted() * b.getIncorrectAttempts() / b.getAskedFreq();
                }
            }
            if (score2 >= score1) {
                return 1;
            } else {
                return -1;
            }
        }
    }
    public QuestionsService() {
        this.allQuestionsData = new ArrayList<>();
        this.queue = new PriorityQueue<>(new QuestionComparator());
    }

    public void saveQuestion(Question q) {
        questionsRepository.save(q);
    }

    // Initializing priority queue with all objects present in database (called from InitialDataPusher)
    public void addQuestion() {
        this.allQuestionsData = questionsRepository.findAll();
        for (Question q : this.allQuestionsData) {
            this.queue.offer(q);
        }
    }

    // fetch question
    public Question fetch() {

        return this.queue.peek();
    }

    public Question getQuestion() {
        return fetch();
    }

    // updates the attempt of question
    public void updateQuestion(boolean isAnswered, boolean timer) {
        Question currentQ  = this.queue.poll();
        currentQ.setAskedFreq(currentQ.getAskedFreq()+1);

        if (!isAnswered || timer) {
            currentQ.setIncorrectAttempts(currentQ.getIncorrectAttempts() + 1);
        }
        this.queue.offer(currentQ);
    }
}
