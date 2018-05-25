import {SET_ROLE} from '../Action/actionTypes';

export default function roleReducer (state='', action)
{
    let {payload, type} = action;
    
    if(type==SET_ROLE)
    {
        return payload;
    }

    return state;
}
