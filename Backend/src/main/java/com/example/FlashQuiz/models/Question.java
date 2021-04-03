package com.example.FlashQuiz.models;

import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.sql.Timestamp;
import java.util.Objects;

// Question Model comprising of attributes of question
@Entity
public class Question {

    // question description
    private String question;

    // options
    private String distractor1;
    private String distractor2;
    private String distractor3;
    private String answer;

    // date on which question is created
    private Timestamp createdAt;

    // number of times its shown till now
    private int askedFreq;

    // number of incorrect attempts is user answered it wrong
    private int incorrectAttempts;

    // time for answering a question
    private int timeAlloted;

    //unique identifier
    @Id @GeneratedValue
    private Integer id;

    public Question(String question, String distractor1, String distractor2, String distractor3, String answer, Timestamp createdAt, int askedFreq, int incorrectAttempts, int timeAlloted) {
        this.question = question;
        this.distractor1 = distractor1;
        this.distractor2 = distractor2;
        this.distractor3 = distractor3;
        this.answer = answer;
        this.createdAt = createdAt;
        this.askedFreq = askedFreq;
        this.incorrectAttempts = incorrectAttempts;
        this.timeAlloted = timeAlloted;
    }

    public Question() {
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getDistractor1() {
        return distractor1;
    }

    public void setDistractor1(String distractor1) {
        this.distractor1 = distractor1;
    }

    public String getDistractor2() {
        return distractor2;
    }

    public void setDistractor2(String distractor2) {
        this.distractor2 = distractor2;
    }

    public String getDistractor3() {
        return distractor3;
    }

    public void setDistractor3(String distractor3) {
        this.distractor3 = distractor3;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public int getAskedFreq() {
        return askedFreq;
    }

    public void setAskedFreq(int askedFreq) {
        this.askedFreq = askedFreq;
    }

    public int getIncorrectAttempts() {
        return incorrectAttempts;
    }

    public void setIncorrectAttempts(int incorrectAttempts) {
        this.incorrectAttempts = incorrectAttempts;
    }

    public int getTimeAlloted() {
        return timeAlloted;
    }

    public void setTimeAlloted(int timeAlloted) {
        this.timeAlloted = timeAlloted;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Question question = (Question) o;
        return id == question.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Question{" +
                "question='" + question + '\'' +
                ", distractor1='" + distractor1 + '\'' +
                ", distractor2='" + distractor2 + '\'' +
                ", distractor3='" + distractor3 + '\'' +
                ", answer='" + answer + '\'' +
                ", createdAt=" + createdAt +
                ", askedFreq=" + askedFreq +
                ", incorrectAttempts=" + incorrectAttempts +
                ", timeAlloted=" + timeAlloted +
                '}';
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

}
