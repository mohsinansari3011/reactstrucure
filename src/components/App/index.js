import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './screens/login/';
import Signup from './screens/signup/';
import Categories from './screens/categories';
import Questions from './screens/questions';
import swal from 'sweetalert';

class App extends Component {

constructor(props){

  super();

  this.state = {

    islogin: false,
    issignup: true,
    isquiz :false,
    isquestions: false,

    quizez: [{ name: "React", Question: "40", time: "1hour" },
    { name: "Angular", Question: "30", time: "1hour" },
    { name: "Php", Question: "40", time: "1hour" },
    { name: "Asp.net", Question: "20", time: "1hour" },
    ]
  };


  this.QuizLogin = this.QuizLogin.bind(this);
  this.QuizSignup = this.QuizSignup.bind(this);
  this.loginCheck = this.loginCheck.bind(this);
  this.showSignup = this.showSignup.bind(this);
  this.showLogin = this.showLogin.bind(this);
  this.Onlogout = this.Onlogout.bind(this);
  this.OnproctoringSubmit = this.OnproctoringSubmit.bind(this);
}

  componentDidMount(){

    this.loginCheck();
  }


loginCheck(){
  //const { islogin, issignup, isquiz } = this.state;
  const username = localStorage.getItem("user");
  const login = localStorage.getItem("login");
  if (username != null) {
  if (login != null) {
    if (login == "logout" ) {
      this.setState({

        issignup: false,
        islogin: true,
        isquiz: false,
      })
    } else if (login == "login"){
      this.setState({

        issignup: false,
        islogin: true,
        isquiz: true,
      })
    }
  }}
  
  
}

  QuizSignup(user, email, pass){

    //const { islogin, issignup, isquiz}= this.state;

    localStorage.setItem("user", user);
    localStorage.setItem("email", email);
    localStorage.setItem("password", pass);
    localStorage.setItem("login", "login");
    this.setState({

      issignup: false,
      islogin: true,
      isquiz: true,
    })

    swal("Good Job", "Signup Successfully", "success");
}


  QuizLogin(email, pass) {

    //const { islogin, issignup, isquiz}= this.state;
    const getEmail = localStorage.getItem("email");
    const getpassword = localStorage.getItem("password");


    console.log("email ", email);
    console.log("pass ",pass);
    console.log("getEmail ", getEmail);
    console.log("getpassword ", getpassword);
    if (getEmail === String(email) && getpassword === String(pass)) {
      this.setState({

        issignup: false,
        islogin: true,
        isquiz: true,
      })
      localStorage.setItem("login", "login");
      swal("Good Job", "Login Successfully", "success");
    }else {
      swal("Bad Job", "Login Failed! Signup if dont have account", "error");
    }
    

    
  }

showLogin(){
  //const { islogin, issignup, isquiz } = this.state;

  this.setState({

    issignup: true,
    islogin: false,
    isquiz: false,
    
  })

  //console.log("showLogin", issignup, islogin, isquiz);
}
showSignup(){
  //const { islogin, issignup, isquiz } = this.state;

  this.setState({


    issignup: false,
    islogin: true,
    isquiz: false,
  })

  //console.log("showSignup", islogin, issignup, isquiz);
}


  Onlogout() {
    //const { islogin, issignup, isquiz } = this.state;

    this.setState({


      issignup: false,
      islogin: true,
      isquiz: false,
      isquestions:false,
    })

    //console.log("showSignup", islogin, issignup, isquiz);
  }


  OnproctoringSubmit() {
    //const { islogin, issignup, isquiz } = this.state;

    this.setState({


      issignup: false,
      islogin: true,
      isquiz: false,
      isquestions: true,
    })

    //console.log("showSignup", islogin, issignup, isquiz);
  }

  render() {

    const { islogin, issignup, isquiz, isquestions, quizez} = this.state;

    return (
      <div className="App">
        <header className="">
          <img src={logo} className="App-logo" alt="logo" />
        </header>

        {islogin && !issignup && !isquiz && !isquestions && <Login onshowLogin={this.showLogin} onLogin={this.QuizLogin} />}
        {!islogin && issignup && !isquiz && !isquestions &&<Signup onshowSignup={this.showSignup} onSignup={this.QuizSignup} />}
        {!issignup && islogin && isquiz && !isquestions && <Categories OnproctoringSuccess={this.OnproctoringSubmit} onLogout={this.Onlogout} list={quizez} />}
        {!issignup && islogin && !isquiz && isquestions && <Questions  list={quizez} />}
       

       
      </div>
    );
  }
}

export default App;
