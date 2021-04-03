import axios from 'axios'
import {GET_QUESTION, UPDATE_QUESTION, GET_QUESTIONS} from './ApiConstants'

// Class that handles api calls

class NetworkCalls {

    getQuestion() {
        return axios.get(GET_QUESTION);
    }

    attemptQuestion(answered, timedOut) {
        
        console.log(answered, timedOut)
        return axios.put(UPDATE_QUESTION, `answered=${answered}&timer=${timedOut}`);
    }
}

export default new NetworkCalls();