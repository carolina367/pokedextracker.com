import { Component } from 'react';
import { Link }      from 'react-router';
import { connect }   from 'react-redux';

import { ErrorComponent } from './error';
import { NavComponent }   from './nav';
import { login }          from '../actions/session';
import { setError }       from '../actions/utils';

export class Login extends Component {

  componentDidMount () {
    this.props.clearError();
  }

  onSubmit = (e) => {
    e.preventDefault();

    const username = this.refs.username.value;
    const password = this.refs.password.value;

    this.props.onSubmit({ username, password });
  }

  render () {
    const { error } = this.props;

    return (
      <div className="login-container">
        <NavComponent></NavComponent>
        <div className="form">
          <h1>Login</h1>
          <form onSubmit={this.onSubmit}>
            <ErrorComponent error={error}></ErrorComponent>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input ref="username" name="username" id="username" type="text" required placeholder="ashketchum10" maxLength="20" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
              <i className="fa fa-asterisk"></i>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input ref="password" name="password" id="password" type="password" required placeholder="••••••••••••" maxLength="72" />
              <i className="fa fa-asterisk"></i>
            </div>
            <button className="btn btn-blue" type="submit">Let's go! <i className="fa fa-long-arrow-right"></i></button>
            <p>Don't have an account yet? <Link className="link" to="/register">Register here</Link>!</p>
          </form>
        </div>
      </div>
    );
  }

}

function mapStateToProps ({ error }) {
  return { error };
}

function mapDispatchToProps (dispatch) {
  return {
    clearError: () => dispatch(setError(null)),
    onSubmit: (payload) => dispatch(login(payload))
  };
}

export const LoginComponent = connect(mapStateToProps, mapDispatchToProps)(Login);
