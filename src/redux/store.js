import {combineReducers, configureStore} from '@reduxjs/toolkit' 

// call reducers
import questionReducer from './questions_reducers'
import resultReducer from './result_reducers'

const rootReducer = combineReducers({
    questions: questionReducer,
    result: resultReducer
})

//create store
export default configureStore({ reducer: rootReducer})