import * as React from 'react'
import ProfileImg from '../../components/ProfileImg'
import Button from '../../components/Button'

const style = {
    container: {
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
    }
}

export default class Profile extends React.Component {
    public render() {
        return (
            <div style={style.container}>
                <ProfileImg />
                <Button>Agregar</Button>
            </div>
        )
    }
}