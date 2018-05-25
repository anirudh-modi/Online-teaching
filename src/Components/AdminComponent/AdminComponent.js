import React from 'react';

export default class AdminComponent extends React.Component {

    componentWillMount()
    {
        if(!this.props.role || this.props.role!=='admin')
        {
            this.props.histpry.push('/');
        }
    }

    render()
    {
        console.log(this.props);
        return (<div>Admin</div>);
    }
}
