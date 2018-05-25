import React from 'react';
import {dispatchRoleChange} from '../Action/action';

export default class LoginComponent extends React.Component
{
    state = {
        'selectedRole':this.props.store.getState().role
    };

    changeRole = (e) =>
    {
        this.setState({
            'selectedRole':e.target.value
        });
    }

    changeUrl = () =>
    {
        let {selectedRole} = this.state;

        let {store, history} = this.props;

        if(selectedRole)
        {
            store.dispatch(dispatchRoleChange(selectedRole));

            history.push(`/${selectedRole}`);
        }
    }

    shouldComponentUpdate(nextProps)
    {
        let {store} = nextProps;

        if(store.getState().role!==this.state.selectedRole)
        {
            return true;
        }

        return false;
    }

    render()
    {
        let {selectedRole} = this.state;

        return (
            <div>
                <div>I am a </div>
                <div>
                    <label>
                        <input selected={selectedRole} value={'admin'} type='radio' name='role' onChange={this.changeRole} />Admin
                    </label>
                    <label>
                        <input selected={selectedRole} value={'student'} type='radio' name='role' onChange={this.changeRole} />Student
                    </label>
                </div>
                <div onClick={this.changeUrl}>
                    Login
                </div>
            </div>
        );
    }
}
