import React from 'react';

export default class StudentComponent extends React.Component {

    componentWillMount()
    {
        if(!this.props.role || this.props.role!=='student')
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
                <div className='userNameContainer'>
                    <span>{student.name}</span>
                    <span>{student.id}</span>
                </div>
            )
        })
    }

    render()
    {
        return (<div>{this.renderUserList()}</div>);
    }
}
