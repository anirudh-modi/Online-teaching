import React from 'react';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import LoginComponent from './LoginComponent';
import AdminController from './AdminComponent/AdminController';
import StudentController from './StudentComponent/StudentController';
import QuestionBuilderComponent from './QuestionComponent/QuestionBuilderComponent';
import {getItemFromLocalStorage} from '../initializeAppData';
import {dispatchReceivedStudents, dispatchReceivedQuestion, dispatchRoleChange} from '../Action/action';

export default class RootComponent extends React.Component
{
    constructor(props)
    {
        super(props);

        this.store = props.store;
        this.getLoginComponent = this.getLoginComponent.bind(this);
        this.getAdminComponent = this.getAdminComponent.bind(this);
        this.getStudentComponent = this.getStudentComponent.bind(this);
        this.getQuestionBuilderComponent = this.getQuestionBuilderComponent.bind(this);
    }

    componentDidMount()
    {
        this.store.dispatch(dispatchReceivedStudents(getItemFromLocalStorage('students')));

        let question = getItemFromLocalStorage('questions');

        if(question)
        {
            this.store.dispatch(dispatchReceivedQuestion(getItemFromLocalStorage('questions')));
        }
    }

    getLoginComponent(props)
    {
        return (<LoginComponent store={this.store} history={props.history} />);
    }

    getAdminComponent(props)
    {
        if(this.store.getState().role!=='admin')
        {
            props.history.push('/');

            return null;
        }

        return (<AdminController store={this.store} history={props.history} />)
    }

    getQuestionBuilderComponent(props)
    {
        if(this.store.getState().role!=='admin')
        {
            props.history.push('/');

            return null;
        }

        return (<QuestionBuilderComponent store={this.store} history={props.history} />)
    }

    getStudentComponent(props)
    {
        if(this.store.getState().role!=='student')
        {
            props.history.push('/');

            return null;
        }


        return (<StudentController store={this.store} history={props.history} />)
    }

    render()
    {
        return (
            <div>
                <div className='header'>Online assessment</div>
                <BrowserRouter>
                    <Switch>
                        <Route exact={true} path='/' component={this.getLoginComponent} />
                        <Route exact={true} path="/admin" component={this.getAdminComponent} />
                        <Route exact={true} path="/admin/createQuestion" component={this.getQuestionBuilderComponent} />
                        <Route exact={true} path="/student" component={this.getStudentComponent} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}
