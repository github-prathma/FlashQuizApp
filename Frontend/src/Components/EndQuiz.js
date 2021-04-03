import React, {Component} from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

// Page which shows when quiz ends

class EndQuiz extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div className="end-quiz-page">


                <h1>
                    Thank you!
                </h1>
                <Snackbar open={true} autoHideDuration={6000} >
                        <Alert severity="success">
                            Thanks for taking the Quiz!
                        </Alert>
                </Snackbar>
            </div>
        )
    }
}

export default EndQuiz;