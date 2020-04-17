import { Dispatch } from "redux"
import { IServices } from "../services"

const START = 'post/fetch-start'
const SUCCESS = 'post/fetch-success'
const ERROR = 'post/fetch-error '

const fetchStart = () => {
    type: START
}

const fetchSuccess = (payload: any) => {
    payload
    type: SUCCESS
}

const fetchError = (error: any) => {
    error
    type: ERROR
}


const initialState = {
    data: {},
    fetched: false,
    fetching: false,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'START':
            return {
                ...state,
                fetching: true
            }
        case 'SUCCESS':
            return {
                ...state,
                data: action.payload,
                fetched: true,
                fetching: true
            }
        case 'ERROR':
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
            const posts = {}
            snaps.forEach(x => posts[x.id] = x.data())
            dispatch(fetchSuccess(posts))
        } catch (e) {
            dispatch(fetchError(e))
        }
    }