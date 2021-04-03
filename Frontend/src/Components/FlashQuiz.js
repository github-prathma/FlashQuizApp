import React, {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Welcome from './Welcome'
import FlashCard from './FlashCard'
// import EndQuiz from './EndQuiz'

// handles route for all components
export default class FlashQuiz extends Component {
    render() {
        return (
            <div className="quiz-app">
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact component={Welcome}/>
                        <Route path="/question/:time" exact component={FlashCard}/>
                        {/* <Route path="/thankyou" exact component={EndQuiz}/> */}
                    </Switch>
                </BrowserRouter>
            </div>
            
        )
    }
}