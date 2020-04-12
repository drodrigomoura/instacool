import * as React from 'react'

import Card from '../../components/Card';
import Container from '../../components/Container'
import LoginForm from '../../components/LoginForm'
import Title from '../../components/Title'


export default class Login extends React.Component {
    public render() {
        return (
            <Container center={true}>
                <Card>
                    <Title>Iniciar Sesión</Title>
                    <LoginForm />
                </Card>
            </Container>
        )
    }
}