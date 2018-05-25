import {ADD_QUESTION, RECEIVE_QUESTION} from '../Action/actionTypes';
import {getItemFromLocalStorage, setItemInLocalStorage} from '../initializeAppData';

export default function questionReducer(state = [], action)
{
    let {payload, type} = action;

    if(type==ADD_QUESTION)
    {
        let questions = getItemFromLocalStorage('questions') || [];

        questions.push(payload);

        setItemInLocalStorage('questions',questions);

        return [...state,payload];
    }
    else if(type==RECEIVE_QUESTION)
    {
        return [...payload];
    }

    return state;
}
