import React, { useEffect } from 'react'
import  { connect  } from 'react-redux'
import * as actions from '../../actions/index'


const SurveyList = (props) => {

    useEffect(() => {
        props.fetchSurveys()
    }, [])
  

    const renderSurveys = () => {
        return props.surveys.reverse().map(s => {
            return <div className="card blue-grey darken-1" key= {s._id}>
                        <div className="card-content white-text">
                            <span className="card-title">{s.title}</span>
                                <p>{s.body}</p>
                                <p className='right'> Sent on {new Date(s.dateSent).toLocaleDateString()}</p>
                                <p>{s.question}</p>
                        </div>
                        <div className="card-action">
                        <a> Yes: {s.yes}</a>
                        <a> No: {s.no}</a>
                      </div>
                </div>
        })
    }
    return  renderSurveys()

}

const mapStateToProps = ({ surveys }) => {
    return { surveys }
}
export default connect(mapStateToProps, actions) (SurveyList)