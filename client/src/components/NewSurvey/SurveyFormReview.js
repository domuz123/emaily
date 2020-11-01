
import React from 'react'
import { connect } from 'react-redux'
import { FIELDS } from './formFields'
import * as actions from '../../actions/index'
import { useHistory } from "react-router-dom";

const Review = ({onCancel, formValues, submitSurvey}) => {
const history = useHistory()
    const formFields = FIELDS.map(({label, name})=> {
        return  <div key={name}>
                     <div> <label>{label}</label> 
                     <div> {formValues[name]} </div> </div>
                </div>
    })
    return <div> 
               {formFields}
               <button onClick={onCancel} className='yellow btn-flat left white-text darken-3' >
                   Back   
                </button>  
                <button onClick={() => submitSurvey(formValues, history)} className='green btn-flat right white-text' type='submit'>
                  Send Survey
                  <i className='material-icons right'> email </i>
                </button> 
            </div>
}
const mapStateToProps = (state) => {
  return  { formValues: state.form.surveyForm.values}
}
export default connect(mapStateToProps, actions) (Review)