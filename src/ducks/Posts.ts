import { Dispatch, AnyAction } from "redux"
import { IServices } from "../services"
import { firestore } from "firebase"

const START = 'post/fetch-start'
const SUCCESS = 'post/fetch-success'
const ERROR = 'post/fetch-error '

interface IData {
    [key: string]: {
        comment: string,
        userId: string,
        createdAt: firestore.Timestamp
    }
}

const fetchStart = () => ({
    type: START
})

const fetchSuccess = (payload: IData) => ({
    payload,
    type: SUCCESS,
}
)
const fetchError = (error: Error) => ({
    error,
    type: ERROR,
})


const initialState = {
    data: {},
    fetched: false,
    fetching: false,
}

export default function reducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case START:
            return {
                ...state,
                fetching: true
            }
        case SUCCESS:
            return {
                ...state,
                data: action.payload,
                fetched: true,
                fetching: true
            }
        case ERROR:
            return {
                ...state,
                error: action.error,
                fetching: false
            }
        default:
            return state
    }
}

export const fetchPosts = () =>
    async (dispatch: Dispatch, getState: () => any, { db }: IServices) => {
        dispatch(fetchStart())
        try {
            const snaps = await db.collection('posts').get()
            const posts: { [index: string]: any } = {}
            snaps.forEach((x) => posts[x.id] = x.data())
            dispatch(fetchSuccess(posts))
        } catch (e) {
            dispatch(fetchError(e))
        }
    }