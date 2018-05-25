import {RECEIVE_STUDENT, ASSIGN_QUESTION} from '../Action/actionTypes';

export default function studentReducer (state=[], action)
{
    let {payload, type} = action;

    if(type==RECEIVE_STUDENT)
    {
        return [...payload];
    }
    else if(type === ASSIGN_QUESTION)
    {
        let stdState = [...state];

        stdState.forEach(std =>
        {
            if(std.id == payload.userId)
            {
                std.questions = payload.questions
            }
        });

        return stdState;
    }
    return state;
}
