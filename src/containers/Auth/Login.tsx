import React from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk';

import Card from '../../components/Card';
import Container from '../../components/Container'
import LoginForm from '../../components/LoginForm'
import Title from '../../components/Title'
import { ILogin, login as loginThunk } from '../../ducks/Users'
import { IState } from '../../ducks'


interface ILoginProps {
    login: (a: ILogin) => void
};

class Login extends React.Component<ILoginProps> {
    public render() {
        const { login } = this.props
        return (
            <Container center={true}>
                <Card>
                    <Title>Iniciar Sesión</Title>
                    <LoginForm onSubmit={login} />
                </Card>
            </Container>
        )
    }
}

const mapStateToProps = (state: IState) => state

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    login: (payload: any) => dispatch(loginThunk(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)