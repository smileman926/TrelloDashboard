import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import Notifications, {notify} from 'react-notify-toast'; 
import axios from "axios";
import {SERVER_PORT} from "../../config"
export default class Confirm extends Component {
  
  // A bit of state to give the user feedback while their email
  // address is being confirmed on the User model on the server.
  constructor() {
    super()
    this.state = {
      confirming: true
    }
  }
  // When the component mounts the mongo id for the user is pulled  from the 
  // params in React Router. This id is then sent to the server to confirm that 
  // the user has clicked on the link in the email. The link in the email will 
  // look something like this: 
  // 
  // http://localhost:3000/confirm/5c40d7607d259400989a9d42
  // 
  // where 5c40d...a9d42 is the unique id created by Mongo
  componentDidMount() {
    const { id } = this.props.match.params
    
    axios
    .post(`${SERVER_PORT}/api/users/register/confirm/${id}`)
    // .then(()=>console.log("ok"))
    // .then(res=> history.push("/login"))
    // .then(res=> res.json())
    .then(res=>{

      this.setState({
        confirming: false,
      })
      notify.show(res.data.msg)
    })
    .catch(err=> console.log(err))
    
  }
  //   fetch(`${API_URL}/email/confirm/${id}`)
  //     .then(res => res.json())
  //     .then(data => {
  //       this.setState({ confirming: false })
  //       notify.show(data.msg)
  //     })
  //     .catch(err => console.log(err))
  // }

  // While the email address is being confirmed on the server a spinner is 
  // shown that gives visual feedback. Once the email has been confirmed the 
  // spinner is stopped and turned into a button that takes the user back to the 
  // <Landing > component so they can confirm another email address.
  render() {
    return (
        <div>
          <Notifications />
          <div className='confirm'>
            {this.state.confirming
              ? <span className="spinner-border spinner-border-sm"></span>

              : <div>
                <p>Your email is confirmed exactly.</p>
                <p>Go to <Link to= "/login">Log in.</Link></p>
                </div>
            }
          </div>
        </div>
      )
  }
}
