import { createSlice} from "@reduxjs/toolkit"

//create reducer
export const questionReducer = createSlice({
    name: "questions",
    initialState : {
        queue : [], //stores all questions
        answers : [], //stores all answers
        trace: 0 //trace question number
    },
    reducers: {     
        //reducers functions
        startExamAction : (state, action) =>{  
            let { question, answers} = action.payload   
            //action variable: access the value of user input
            //state variable: current state
            return {
                ...state,
                // queue : action.payload
                queue: question,
                answers: answers
            }
        },
        moveNextAction: (state) => {
            return{
                ...state,
                trace: state.trace + 1
            }
        },
        movePrevAction: (state) => {
            return{
                ...state,
                trace: state.trace - 1
            }
        },
        resetAllAction: () => {
           return{
            queue : [], 
            answers : [],
            trace: 0 
           }
        }
        
    }
})
export const { startExamAction, moveNextAction, movePrevAction, resetAllAction } = questionReducer.actions;

export default questionReducer.reducer;