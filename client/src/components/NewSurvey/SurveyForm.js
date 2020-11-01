import React from 'react' 
import { reduxForm, Field } from 'redux-form'
import SurveyField from './SurveyField'
import { Link } from 'react-router-dom'
import { validateEmails } from '../../utils/validateEmails'
import { FIELDS } from './formFields'

const SurveyForm = (props) => {
    const renderFields = () => {
        return  FIELDS.map(( f, i ) =>  <Field key={i} type='text' name={f.name} component={SurveyField} label={f.label}/> )
               
    }
    return (<form onSubmit={props.handleSubmit(props.onSurveyFormSubmit)}>
                {renderFields()}
              <div> 
                    <Link to='/surveys' className='red btn-flat left white-text' type='submit'>Cancel  
                    </Link>  
                   <button  className='teal btn-flat right white-text' type='submit'>Next  
                     <i className='material-icons right'>done</i>    
                    </button>  
                    
              </div>  
           </form>)
}
const validate = (values) => {
    const errors = {}
    errors.recipients = validateEmails( values.recipients || '' ) 

    FIELDS.forEach(({name}) => {
        if(!values[name]) {
            errors[name]= `You must provide a value`
        }
    })
  
    return errors

}
export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
}) (SurveyForm)