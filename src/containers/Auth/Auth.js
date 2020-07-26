import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import {updateObject, checkValidity} from '../../shared/utility';

class Auth extends Component {
    state = {
        authForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minlength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: false
    }

    componentDidMount(){
        if(!this.props.buildingBurger &&  this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath();
        }
    }

    inputchangedHandler(event, identifier){
        const updatedAuthForm = updateObject(this.state.authForm,{
            [identifier]: updateObject(this.state.authForm[identifier],{
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.authForm[identifier].validation),
                touched: true
            })
        })
        this.setState({authForm: updatedAuthForm});
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth( this.state.authForm.email.value, this.state.authForm.password.value, this.state.isSignUp);
    }

    switchAuthModeHandler = () => {
        this.setState( prevState => {
            return {isSignUp: !prevState.isSignUp}
        });
    }

    displayError = () => {
        if(this.props.error){
            return (
                <div className={classes.Panel}>
                    <p style={{'font-size': '28px', 'margin':'2px 0px'}}>Error!!!</p>
                    <span>{this.props.error.message}</span>
                </div>
            )
        }
    }

    render() {
        let formElementsArray = [];
        for (let key in this.state.authForm) {
            formElementsArray.push({
                id: key,
                config: this.state.authForm[key]
            })
        }
        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                shouldValidate={formElement.config.validation}
                invalid={!formElement.config.valid}
                touched={formElement.config.touched}
                changed={(event) => this.inputchangedHandler(event, formElement.id)} />
        ))

        if(this.props.loading){
            form = <Spinner/>
        }

        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {this.displayError()}
                <h2 className={classes.H2}>{this.state.isSignUp?'SignUp':'LogIn'}</h2>
                <form onSubmit = {this.onSubmitHandler}>
                    {form }
                    <Button
                        // disabled={!this.state.formIsValid}
                        btnType="Success">{this.state.isSignUp?'SignUp':'LogIn'}</Button>
                </form>
                <Button
                    clicked= {this.switchAuthModeHandler}
                    btnType="Shadow">  Switch to {this.state.isSignUp?'LogIn':'SignUp'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token!==null,
        authRedirectPath: state.auth.authRedirectPath,
        buildingBurger: state.burgerBuilder.building
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);