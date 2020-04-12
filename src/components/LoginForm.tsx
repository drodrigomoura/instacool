import * as React from 'react'
import { Link } from 'react-router-dom'
import { reduxForm, InjectedFormProps } from 'redux-form'

import Input from './Input';
import Button from './Button';
import Center from './Center';



class LoginForm extends React.Component<InjectedFormProps> {
    public render() {
        const { handleSubmit } = this.props
        return (
            <form onSubmit={handleSubmit}>
                <Input placeholder='correo' label='correo' />
                <Input placeholder='contraseña' label='contraseña' />
                <Button block={true}>Enviar</Button>
                <Center>
                    <Link to='/register'>Registrarse</Link>
                </Center>
            </form>
        )
    }
}

export default reduxForm({
    form: 'login',
})(LoginForm)