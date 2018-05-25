import {RECEIVE_STUDENT, SET_ROLE, ADD_QUESTION, RECEIVE_QUESTION, ASSIGN_QUESTION} from './actionTypes';

export function dispatchReceivedStudents(students)
{
    return {
        'type':RECEIVE_STUDENT,
        'payload':students
    }
}

export function dispatchRoleChange(role)
{
    return {
        'type':SET_ROLE,
        'payload':role
    }
}

export function addQuestion(question)
{
    return {
        'type':ADD_QUESTION,
        'payload':question
    }
}

export function dispatchReceivedQuestion(question)
{
    return {
        'type':RECEIVE_QUESTION,
        'payload':question
    }
}

export function dispatchAssignQuestion(userId,questions)
{
    return {
        'type':ASSIGN_QUESTION,
        'payload':{
        userId:userId,
        questions:questions
        }
    }
}
