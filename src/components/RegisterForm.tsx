import React from 'react'
import { Link } from 'react-router-dom'
import { reduxForm, InjectedFormProps, Field } from 'redux-form'

import Input from './Input';
import Button from './Button';
import Center from './Center';



class RegisterForm extends React.Component<InjectedFormProps> {
    public render() {
        const { handleSubmit } = this.props
        return (
            <form onSubmit={handleSubmit}>
                <Field label='Correo' placeholder="Correo" name='email' type='email' component={Input} />
                <Field label='Contraseña' placeholder="Contraseña" name='password' type='password' component={Input} />
                <Button block={true}>Enviar</Button>
                <Center>
                    <Link to='/'>Iniciar Sesion</Link>
                </Center>
            </form>
        )
    }
}

//habia que agregar <any, any> -> que dolor de b...
export default reduxForm<any, any>({
    form: 'register',
})(RegisterForm)