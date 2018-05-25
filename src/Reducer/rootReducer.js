import roleReducer from './roleReducer';
import studentReducer from './studentReducer';
import questionReducer from './questionReducer';

export default function rootReducer(state = {}, action)
{
    return {
        'role':roleReducer(state.role, action),
        'students':studentReducer(state.students, action),
        'questions':questionReducer(state.questions, action)
    }
}
