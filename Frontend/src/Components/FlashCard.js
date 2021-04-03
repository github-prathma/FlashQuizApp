import React, {Component} from 'react'
import NetworkCalls from '../Backend/NetworkCalls'
import {Button} from "@material-ui/core"
import EndQuiz from './EndQuiz'
import '../CSS/FlashCard.css'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { colors } from 'material-ui/styles'

// question page

class FlashCard extends Component {

    constructor(props) {
        super(props)

        this.state = {

            question : {

                text:'',
                option1: '',
                option2: '',
                option3: '',
                answer: '',
                time: 0,
                answered: false
            },
            minutes: 0,
            seconds: 0,
            quizTime: this.props.match.params.time,
            quizMinutes: 0,
            quizSeconds: 0,
            quizOver: false,
            open: false

        }
        
        this.format = this.format.bind(this);
        this.countdown = this.countdown.bind(this);
        this.quizCountdown = this.quizCountdown.bind(this);
        this.optionClicked = this.optionClicked.bind(this);
        this.intervalReset = this.intervalReset.bind(this);

    }

    // 00:00 display format for both timers

    format(isQuestion) {
        let m = 0;
        let s = 0;
        if(isQuestion) {
            m = this.state.minutes;
            s = this.state.seconds;
        } else {
            m = this.state.quizMinutes;
            s = this.state.quizSeconds;
        }
        
        m = m < 1 ? '00' : m < 10 ? `0${m}` : m;
        s = s < 1 ? '00' : s < 10 ? `0${s}` : s;
        return `${m}:${s}`;
    }


    // timer count to track the quiz time
    quizCountdown() {
        if (this.state.quizSeconds > 0) {
            this.setState(state => {
                return {
                    quizSeconds: state.quizSeconds-1
                }
            })
        }
        else if (this.state.quizSeconds  === 0) {
            if (this.state.quizMinutes === 0) {
                // Quiz Over
                this.setState({
                    open:true,
                    quizOver: true,
                    quizTime: 0
                })
            } else {
                this.setState(state => {
                    return {
                        quizSeconds: 59,
                        quizMinutes: state.quizMinutes-1
                    }
                    
                })
            }
        } 
    }

    // timer to track the question time
    countdown() {
        if (this.state.seconds > 0) {
            this.setState(state => {
                return {
                    seconds: state.seconds-1
                }
            })
        }
        else if (this.state.seconds  === 0) {
            if (this.state.minutes === 0) {
                if (this.state.quizTime > 0) {
                    this.attempt(false, true)
                    this.setState(state => {
                        return {
                            question: {
                                ...state,
                                time: 0
                            }
                        }
                        
                    })
                }
                clearInterval(this.myInterval)
            } else {
                this.setState(state => {
                    return {
                        seconds: 59,
                        minutes: state.minutes-1
                    }
                    
                })
            }
        } 
    }

    // reset timer of question once component reloads with new question
    intervalReset() {
        clearInterval(this.myInterval)
    }

    // handles success call of api /getQuestion
    handleSuccess = (response) => {
        
        console.log(response)

        this.setState(state => {
            return {
                question: {
                    text: response.data.question,
                    option1: response.data.distractor1,
                    option2: response.data.distractor2,
                    option3: response.data.distractor3,
                    answer: response.data.answer,
                    time: response.data.timeAlloted,
                    answered: false
                }
            }
        })
        let secs = this.state.question.time;
        let s = secs % 60;
        let m = Math.floor(secs / 60);
        let quizTime = this.state.quizTime;
        let qs = quizTime % 60;
        let qm = Math.floor(quizTime / 60);


       this.setState(state => {
            return {
                minutes: m,
                seconds: s,
                quizMinutes: qm,
                quizSeconds: qs,
                quizTime: quizTime
            }
       })
       

    }

    // if any question is attempt correct once any option is clicked
    optionClicked(correct) {
        this.attempt(correct, false)
    }

    // if any question is attempted wrong or question timer ends
    attempt(answered, timedOut) {
        NetworkCalls.attemptQuestion(answered, timedOut).then(response => {
            this.changeQuestion();
        }).catch(error => {console.log(error)});
    }

    // fetches new question 
    changeQuestion() {
       
        if (this.state.quizTime <= 0) {
            this.setState(state => {
                return {
                    quizOver: true,
                    open: true
                }
            })
        } else {
            this.setState(state => {
                return{
                    question : {
                        text:'',
                        option1: '',
                        option2: '',
                        option3: '',
                        answer: '',
                        time: 0,
                        answered: false
                    },
                    minutes: 0,
                    seconds: 0,
                    quizTime: state.quizTime - (state.question.time - (state.minutes*60 + state.seconds)),
                    open:false,
                    quizOver: false,
                }
            })
            this.requestForQuestion();
        }
        
    }

    // api call to fetch a question
    requestForQuestion() {
        NetworkCalls.getQuestion().then(response => this.handleSuccess(response)).catch(error => console.log(error))
    }

    //setting timers when component loads
    componentDidMount() {

        this.requestForQuestion();

        this.myInterval = setInterval(this.countdown, 1000)
        this.quizInterval = setInterval(this.quizCountdown, 1000)
    }

    componentWillUnmount() {
        if (this.myInterval) {
            this.intervalReset();
        }
    }

    //UI
    render() {
        

        return (

            <div className = "question-card">

                <div className="header">
                    <h1>Flash Quiz</h1>
                    <div className="spacer"/>
                    <div className="quizTimer">{this.format(false)}</div>
                </div>

                <div className="question">
                    <div className="title">
                        <div className="spacer"/>
                        <h2> Question </h2>
                        <div className="spacer"/>
                        <div className="questTimer">{this.format(true)}</div>

                    </div>
                    <div className="vspace">

                    </div>
                    <div className="vspace">
                        
                    </div>
                    <div className="question-content">

                        <div className="question-text">{this.state.question.text}</div>
                        <div className="vspace">

                        </div>
                        <div className="options">
                                <Table className="options-table" aria-label="simple table">
                                    <TableRow style={{height : 50, justifyContent: 'space-evenly'}} className = "row">
                                        <TableCell style = {{display : 'inline', borderBottomWidth:0}} className = "option-1" align="right">
                                            <Button style={{backgroundColor: '#ffe8dd'}} variant="contained" onClick={() => this.optionClicked(false)} >{this.state.question.option1}</Button>

                                        </TableCell>
                                        <TableCell style = {{display : 'inline', borderBottomWidth:0}} className = "option-2" align="left">
                                             <Button style={{backgroundColor: '#ffe8dd'}} variant="contained" onClick={() => this.optionClicked(false)}>{this.state.question.option3}</Button>

                                        </TableCell>
                                    </TableRow>
                                    <TableRow style={{height : 50, justifyContent: 'space-evenly', border : 0}} className = "row">
                                        <TableCell style = {{display : 'inline', borderBottomWidth:0}} className = "option-1" align="right">
                                            <Button style={{backgroundColor: '#ffe8dd'}} variant="contained" onClick={() => this.optionClicked(false)} >{this.state.question.option2}</Button>

                                        </TableCell>
                                        <TableCell style = {{display : 'inline', borderBottomWidth:0}} className = "option-2" align="left">
                                             <Button style={{backgroundColor: '#ffe8dd'}} variant="contained" onClick={() => this.optionClicked(false)}>{this.state.question.answer}</Button>

                                        </TableCell>
                                    </TableRow>
                                </Table>
                        
                        </div>
                        
                    </div>
                    <div>
                        {this.state.quizOver && <EndQuiz/>}
                    </div>
                </div>

                
            </div>

        )
    }
}

export default FlashCard;