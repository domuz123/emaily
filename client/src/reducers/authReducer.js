
import * as actions from '../actions/types'

const authReducer = (state = null, action) => {
  
    switch (action.type) {
        case actions.FETCH_USER:
            return action.payload || false
        default:
            return state
    }

}

export default authReducer