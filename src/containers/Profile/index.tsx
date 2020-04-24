import * as React from 'react'
import ProfileImg from '../../components/ProfileImg'
import Button from '../../components/Button'
import Card from '../../components/Card'
import * as postsDuck from '../../ducks/Posts'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import services from '../../services'
import { chunk } from 'lodash'

const { auth } = services

const style = {
    container: {
        padding: '15px',
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px'
    }
}


interface IProfileProps {
    fetchPosts: () => void,
    fetched: boolean,
    loading: boolean,
    data: postsDuck.IPost[][]
}

class Profile extends React.Component<IProfileProps> {
    constructor(props: IProfileProps) {
        super(props)
        const { fetchPosts, fetched } = props
        if (fetched) {
            return
        }
        fetchPosts()
    }
    public render() {
        return (
            <div style={style.container}>
                <div style={style.row}>
                    <ProfileImg />
                    <Button>Agregar</Button>
                </div>
                <div style={style.row}>
                    <Card><img src='http://placekitten.com/100/100' alt='img' /></Card>
                    <Card><img src='http://placekitten.com/100/100' alt='img' /></Card>
                    <Card><img src='http://placekitten.com/100/100' alt='img' /></Card>
                </div>
                <div style={style.row}>
                    <Card><img src='http://placekitten.com/100/100' alt='img' /></Card>
                    <Card><img src='http://placekitten.com/100/100' alt='img' /></Card>
                    <Card><img src='http://placekitten.com/100/100' alt='img' /></Card>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state: any) => {
    console.log('mapstatetoprops', state);

    const { Post: { data, fetching, fetched } } = state
    const loading = fetching || !fetched
    console.log(auth.currentUser && auth.currentUser.uid)

    const filtered = Object.keys(data).reduce((acc, el) => {
        if (data[el].userId !== (auth.currentUser && auth.currentUser.uid)) {
            return acc
        }
        return acc.concat(data[el])
    }, [] as postsDuck.IPost[])

    return {
        data: chunk(filtered, 3),
        fetched,
        loading,
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => bindActionCreators(postsDuck, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Profile)