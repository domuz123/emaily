import React, { useState } from 'react' 
import SurveyForm from './SurveyForm'
import SurveyFormReview from './SurveyFormReview'
import { reduxForm }   from 'redux-form'

const NewSurvey = () => {
    const [reviewForm, setReviewForm] = useState(false)
    return <div>  {!reviewForm ? 
                    <SurveyForm onSurveyFormSubmit={() => setReviewForm(true)} /> : 
                    <SurveyFormReview onCancel={() => setReviewForm(false)}/> }
          </div>
}
export default reduxForm({
    form: 'surveyForm'
}) (NewSurvey)