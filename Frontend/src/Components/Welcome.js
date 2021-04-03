import React, {Component} from 'react'
import {Button, TextField} from "@material-ui/core"
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Alert from '@material-ui/lab/Alert'
import { withRouter } from 'react-router-dom';
import '../CSS/Welcome.css'
import QuizBg from '../Images/quiz.jpeg'

// welcome page when app opens
class Welcome extends Component {

    constructor(props) {
        super(props)

        this.state = {
            time: 0,
            timeType: '',
            showError: false
        };
    }

   render() {
       return (

            <div className="welcome-page">

                
                <div className="content">
                
                    <h1> Flash Quiz </h1>
                    <div className="vspace">

                    </div>
                    <div className="vspace">

                    </div>

                    <div className="welcome-form" styles={{ backgroundImage:`url(${QuizBg})` }}>
                        <h3> How much time you wanna play?</h3>
                        <div className="vspace">

                        </div>
                        <form className="fill-form" noValidate autoComplete="off">
                            <div className="fields">

                                <TextField required name="time-field" id="time-field" type="number" value={this.state.time} variant="outlined" onChange={this.timeChanged}> </TextField>
                                <Select className="select-type" labelId="demo-simple-select-label" id="demo-simple-select"
                                        value={this.state.timeType}
                                        onChange={this.granularityChange}
                                >
                                    <MenuItem value="" disabled>Placeholder</MenuItem>
                                    <MenuItem value={'secs'}>Seconds</MenuItem>
                                    <MenuItem value={'mins'}>Minutes</MenuItem>
                                    <MenuItem value={'hrs'}>Hours</MenuItem>
                                </Select>
                                
                            </div>
                            <div className="vspace">

                            </div>
                            <div className="click-button">
                                <Button variant="contained" color="secondary" onClick={()=>this.playClicked(this.state.time)}>Lets Play!</Button>

                            </div>

                        </form>

                    </div>
                
                    <div></div>

                    {this.state.showError && <Alert severity="error">Please enter valid time and its unit!</Alert>}
                </div>
            
            
            </div>
       )
   }

   // when time is entered in input field
   timeChanged = (event) => {
    
        if (event.target.value < 0) {
            event.target.value = 0
        }
        this.setState({time: event.target.value});
    
  }

  // selects mins/hrs/secs from menu
  granularityChange = (event) => {
      this.setState({timeType: event.target.value})
  }

  // once button lets play! clicked
  playClicked = (event) => {
      if (event <= 0) {
        this.setState({showError: true})
      } else {
        let time = this.state.time
        let tType = this.state.timeType

        console.log(tType);
        if (tType.trim().length===0 || tType === '') {
            this.setState({
                showError: true
            })
        } else {
            if (tType === 'mins') {
                time = time*60
            }else if (tType === 'hrs') {
                time = time*60*60
            }
            this.setState({showError: false})
            this.props.history.push(`/question/${time}`);
        }
        
      }
  }
}

export default withRouter(Welcome);