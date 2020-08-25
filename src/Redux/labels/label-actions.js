import {ADD_LABEL , REMOVE_LABEL} from './label-constants'


export const addLabel = (item) => {
    return {
        type : ADD_LABEL,
        payload : item
    }
}

export const removeLabel = (item) => {
    console.log(item)
    return{
        type : REMOVE_LABEL,
        payload : item
    }
}


