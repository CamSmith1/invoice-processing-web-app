import {ADD_LABEL ,REMOVE_LABEL} from './label-constants'

const initialState  = {
    labels : []
}

const labelsReducer = (state = initialState , action) => {
    switch (action.type) {
        case ADD_LABEL:
            return{
                labels : [...state.labels , action.payload]
            }
        case REMOVE_LABEL:
            return{
                labels : state.labels.filter( label => label.id !== action.payload)
            }
        default:
            return state
    }
}

export default labelsReducer