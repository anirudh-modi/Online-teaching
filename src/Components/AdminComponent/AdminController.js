import React from 'react';
import {dispatchAssignQuestion} from '../../Action/action';
import {getItemFromLocalStorage, setItemInLocalStorage} from '../../initializeAppData';

export default class AdminController extends React.Component
{

    state = {
        'questions':this.props.store.getState().questions,
        'students':this.props.store.getState().students,
        'selectedQuestion':[],
        showAssignTo:false,
        'assignTo':''
    }

    componentWillMount()
    {
        let {store, history} = this.props;

        let role = store.getState().role;

        if(role!=='admin')
        {
            history.push('/');
        }
    }

    navigateToQuestionBuilder = ()=>
    {
        this.props.history.push('/admin/createQuestion');
    }

    changeSelectedQuestion = (e) =>
    {
        let isChecked = e.target.checked;

        let selQuestion = this.state.selectedQuestion;

        if(isChecked)
        {
            selQuestion.push(e.target.value);
        }
        else
        {
            let ind = selQuestion.indexOf(e.target.value);

            if(ind>=0)
            {
                selQuestion.splice(ind,1);
            }
        }

        this.setState({
            selectedQuestion:selQuestion
        });
    }

    getQuestionList = () =>
    {
        if(this.state.questions.length)
        {
            let questionList = [];

            this.state.questions.forEach((question,index) => {
                questionList.push(
                    <div className='questionListRow' key={question.id}>
                        <label className='questionSelectBoxAndSlNum'>
                            <input onChange={this.changeSelectedQuestion}className='checkbox'type='checkbox' value={question.id} checked={this.state.selectedQuestion.indexOf(question.id)>=0}/>
                            Slno : {index+1}
                        </label>
                        <div className='questionAndTypeContainer noPaddingBorderRight'>
                            <span className='questionTitle borderRight cloumFlex'>
                                <div className='questionMainTitle'>{question.title}</div>
                                <div className='questionDes'>{question.description}</div>
                            </span>
                            <div className='cloumFlex marginRight10'>
                                <span className='questionMainTitle'>Question Type</span>
                                <span className='questionDes'>{question.typeOfQuestion=='mcq'?'MCQ (Quiz)':question.typeOfQuestion=='stq'?'Submission':'Passage (Text)'}</span>
                            </div>
                        </div>
                    </div>
                )
            });

            return questionList;
        }
        else
        {
            return null;
        }
    }

    toggleAssignTo = (e) =>
    {
        this.setState({
            showAssignTo:!this.state.showAssignTo
        })
    }

    handleAssignTo = (e) =>
    {
            this.setState({
                'assignTo':e.target.value
            })
    }

    getAssigneeList = () =>
    {
        let assingees = [];

        this.state.students.forEach(({id,name}) => {
            assingees.push(
                <label key={id} className='assignUserContainer'>
                    <input name='assignTo' onChange={this.handleAssignTo} type='radio' value={id} selected={this.state.assignTo==id} default/>
                    <div className='userName'>{name}</div>
                    <div className='userId'>{`(${id})`}</div>
                </label>
            )
        });

        return assingees;
    }

    assignQuestionToUser = () =>
    {
        let {selectedQuestion, assignTo, questions} = this.state;

        if(assignTo)
        {
            let filQuestions = questions.
                                filter(qu => selectedQuestion.indexOf(qu.id)>=0).
                                map(({
                                    id, options,instructions, description, title, typeOfQuestion
                                }) => {
                                    return {
                                        id, options,instructions, description, title, typeOfQuestion
                                    }
                                });

            let students = this.props.store.getState().students;

            let studentToAssign = students.filter(student => student.id==assignTo);

            if(studentToAssign && studentToAssign.length)
            {
                var questionsAlreadyAssigned = studentToAssign[0].questions;

                let questionsAssignedId = questionsAlreadyAssigned.map(question => question.id);

                filQuestions.forEach(question => {
                    if(questionsAssignedId.indexOf(question.id)<0)
                    {
                        questionsAlreadyAssigned.push(question)
                    }
                    else
                    {
                        questionsAlreadyAssigned.splice(questionsAssignedId.indexOf(question.id),question);
                    }
                });
            }

            let studentsInLocaStorage = getItemFromLocalStorage('students');

            studentsInLocaStorage.forEach(std =>
            {
                if(std.id == assignTo)
                {
                    std.questions = questionsAlreadyAssigned;
                }
            })

            setItemInLocalStorage('students',studentsInLocaStorage);

            this.props.store.dispatch(dispatchAssignQuestion(assignTo,questionsAlreadyAssigned));

            this.setState({
                'assignTo':'',
                'selectedQuestion':[],
                showAssignTo:false
            });
        }
        else
        {
            alert('Select a student to assign');
        }
    }

    cancelUserAssign = () =>
    {
        this.setState({
            'assignTo':'',
            showAssignTo:false
        });
    }

    showAssignTo = () =>
    {
        if(this.state.showAssignTo)
        {
            return (
                <div className='assignUserMain'>
                    <div className='containerCenter'>
                        {this.getAssigneeList()}
                        <div>
                            <button className='newQuestion' onClick={this.cancelUserAssign}>Cancel</button>
                            <button className='newQuestion' onClick={this.assignQuestionToUser}>Assign</button>
                        </div>
                    </div>
                </div>
            );
        }
        else
        {
            return null;
        }
    }

    render()
    {
        return (
            <div className='questionBuilderInnerContainer questionListMainContainer'>
                <div>Question List</div>
                <div className='questionListRow'>
                    <label className='questionSelectBoxAndSlNum'>
                        <input className='checkbox'type='checkbox' />
                        Select all
                    </label>
                    <div className='questionAndTypeContainer'>
                        <span className='questionTitle'>Select question to Assign</span>
                        <button onClick={this.toggleAssignTo}className={this.state.selectedQuestion.length?'saveAuthor margin10':'saveAuthor margin10 disabled'} >Assign</button>
                        <button className='newQuestion margin10'onClick={this.navigateToQuestionBuilder}>Author New Question</button>
                    </div>
                </div>
                {this.getQuestionList()}
                {this.showAssignTo()}
            </div>
        );
    }
}
