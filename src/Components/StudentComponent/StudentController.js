import React from 'react';

export default class StudentContorller extends React.Component {

    componentWillMount()
    {
        if(this.props.store.getState().role!=='student')
        {
            this.props.history.push('/');
        }
    }

    renderUserList = (e) =>
    {
        let {students} = this.props.store.getState();

        return students.map(student =>
        {
            return (
                <div className='userNameContainer' key={student.id}>
                    <span>{student.name}</span>
                    <span className='marginLeft20'>{student.id}</span>
                    <span className='marginLeft20'>{student.questions.length} question(s) assigned</span>
                </div>
            )
        })
    }

    render()
    {
        return (
            <div className='questionBuilderContainer'>
                <div className='questionBuilderInnerContainer'>
                    <div>Students signed up</div>
                    <div className='studentListContainer'>{this.renderUserList()}</div>
                </div>
            </div>
        );
    }
}
