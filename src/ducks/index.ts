import { IDataPosts } from './Posts'

export { default as Users } from './Users'
export { default as Post } from './Posts'

export interface IState {
    Post: {
        data: IDataPosts,
        fetched: boolean,
        fetching: boolean
    },
    User: {
        profileImage?: string
    }
}