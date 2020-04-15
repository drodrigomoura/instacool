import * as React from 'react';
import { WrappedFieldProps } from 'redux-form'

const style = {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginBottom: '10px',
    padding: '10px 15px',
    width: 'calc(100% - 30px)',
}

const spanStyle = {
    color: '#777',
    fontWeight: 900,
    fontSize: '10px',
    textTransform: 'uppercase',
} as React.CSSProperties

interface IInputProps {
    placeholder?: string,
    label: string
}

const Input: React.StatelessComponent<WrappedFieldProps & IInputProps> = props => {
    //solucion al problema de que no llegan los valores de email y pass al reducer
    //1 agregar input al destructuring
    //2 y agregar un spread de input en el tag input
    const { label, input } = props
    return (
        <div>
            <span style={spanStyle}>{label}</span>
            {/* paso 2 v*/}
            <input {...input} {...props} style={style} />
        </div>
    )
}

export default Input