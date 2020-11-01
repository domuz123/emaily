import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import Header from './Header/Header'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Landing from '../components/Landing/Landing'
import Dashboard from '../components/Dashboard/Dashboard'
import NewSurvey from '../components/NewSurvey/NewSurvey'


const App = (props) => {

  useEffect(() => {
    props.fetchUser()
  }, [props])
 
  return (
    <div className="container">
      <BrowserRouter>
        <Header />
        <Route path='/' component={Landing} />
        <Route exact path='/surveys' component={Dashboard} />
        <Route exact path='/surveys/new' component={NewSurvey} />
      </BrowserRouter>
    </div>
  );
}

export default connect(null, actions)(App);
