import { Dispatch, AnyAction } from "redux"
import { IServices } from "../services"
import { firestore } from "firebase"

const START = 'posts/fetch-start'
const SUCCESS = 'posts/fetch-success'
const ERROR = 'posts/fetch-error '

export interface IDataPosts {
    [key: string]: {
        comment: string,
        userId: string,
        createdAt: firestore.Timestamp,
        imageURL: string
    }
}

const fetchStart = () => ({
    type: START,
})

const fetchSuccess = (payload: IDataPosts) => ({
    type: SUCCESS,
    payload,
}
)
const fetchError = (error: Error) => ({
    type: ERROR,
    error,
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
                fetching: false
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
    async (dispatch: Dispatch, getState: () => any, { db, storage }: IServices) => {
        dispatch(fetchStart())
        try {
            const snaps = await db.collection('posts').get()

            const posts: { [index: string]: any } = {}
            snaps.forEach((x) => posts[x.id] = x.data())

            // console.log(await Promise.all(Object.keys(posts)));

            const imgIds = await Promise.all(Object.keys(posts)
                .map(async x => {
                    const ref = storage.ref(`posts/${x}.jpg`)
                    const url = await ref.getDownloadURL()
                    console.log(url);

                    return [x, url]
                }))
            // console.log(imgIds);

            const keyedImages: { [index: string]: any } = {}
            imgIds.forEach(x => keyedImages[x[0]] = x[1])
            // console.log('keyedImages', keyedImages);

            Object.keys(posts).forEach(x => posts[x] = {
                ...posts[x],
                imageURL: keyedImages[x]
            })

            console.log(posts);

            dispatch(fetchSuccess(posts))
        } catch (e) {
            dispatch(fetchError(e))
        }
    }

export const like = (id: string) =>
    async (dispatch: Dispatch, getState: () => any, { }: IServices) => {
        console.log(id);
        await fetch('/api/posts')
    }

export const share = (id: string) =>
    async (dispatch: Dispatch, getState: () => any, { }: IServices) => {
        console.log(id);
    }