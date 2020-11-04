import * as actions from '../actions/types'

const surveyReducer = (state = [], action) => {

    switch (action.type) {
        case actions.FETCH_SURVEYS:
            return action.payload
        default:
            return state
    }

}

export default surveyReducer