import * as React from 'react'
import Post from '../../components/Post'
import Container from '../../components/Container'

export default class NewsFeed extends React.Component {
    public render() {
        return (
            <Container >
                <div>
                    <Post />
                </div>
            </Container>
        )
    }
}