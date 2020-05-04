import { Dispatch, AnyAction } from "redux";
import { IServices } from "../services";
import { firestore } from "firebase";
import { download } from "../utils";
import { setProfileImage } from './Users'

const START = "posts/fetch-start";
const SUCCESS = "posts/fetch-success";
const ERROR = "posts/fetch-error";
const ADD = "posts/add";

export interface IPost {
  comment: string;
  userId: string;
  createdAt: firestore.Timestamp;
  imageURL: string;
}
export interface IDataPosts {
  [key: string]: IPost;
}

const fetchStart = () => ({
  type: START,
});

const fetchSuccess = (payload: IDataPosts) => ({
  type: SUCCESS,
  payload,
});
const fetchError = (error: Error) => ({
  type: ERROR,
  error,
});

const add = (payload: IDataPosts) => ({
  payload,
  type: ADD,
});

const initialState = {
  data: {},
  fetched: false,
  fetching: false,
};

export default function reducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case START:
      return {
        ...state,
        fetching: true,
      };
    case SUCCESS:
      return {
        ...state,
        data: action.payload,
        fetched: true,
        fetching: false,
      };
    case ERROR:
      return {
        ...state,
        error: action.error,
        fetching: false,
      };
    case ADD:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };
    default:
      return state;
  }
}

export const fetchPosts = () => async (
  dispatch: Dispatch,
  getState: () => any,
  { db, storage }: IServices
) => {
  dispatch(fetchStart());
  try {
    const snaps = await db
      .collection("posts")
      .orderBy("createdAt", "desc")
      .get();
    const posts: { [index: string]: any } = {};
    snaps.forEach((x) => (posts[x.id] = x.data()));

    const imgIds = await Promise.all(
      Object.keys(posts).map(async (x) => {
        const ref = storage.ref(`posts/${x}.jpg`);
        const url = await ref.getDownloadURL();
        console.log(url);

        return [x, url];
      })
    );

    const keyedImages: { [index: string]: any } = {};
    imgIds.forEach((x) => (keyedImages[x[0]] = x[1]));
    // console.log('keyedImages', keyedImages);

    Object.keys(posts).forEach(
      (x) =>
        (posts[x] = {
          ...posts[x],
          imageURL: keyedImages[x],
        })
    );

    console.log(posts);

    dispatch(fetchSuccess(posts));
  } catch (e) {
    dispatch(fetchError(e));
  }
};

export const like = (id: string) => async (
  dispatch: Dispatch,
  getState: () => any,
  { auth }: IServices
) => {
  if (!auth.currentUser) return;
  const token = await auth.currentUser.getIdToken();
  await fetch(`/api/posts/${id}/like`, {
    headers: {
      authorization: token,
    },
  });
};

export const share = (id: string) => async (
  dispatch: Dispatch,
  getState: () => any,
  { auth, db, storage }: IServices
) => {
  if (!auth.currentUser) return;
  const token = await auth.currentUser.getIdToken();
  const result = await fetch(`/api/posts/${id}/share`, {
    headers: {
      authorization: token,
    },
  });

  const url = await storage.ref(`posts/${id}.jpg`).getDownloadURL();
  const blob = (await download(url)) as Blob;

  const { id: postId }: { id: string } = await result.json();
  const ref = storage.ref(`posts/${postId}.jpg`);

  await ref.put(blob);
  const imageURL = await ref.getDownloadURL();
  const snap = await db.collection("posts").doc(postId).get();

  dispatch(
    add({
      [snap.id]: {
        ...snap.data(),
        imageURL,
      },
    } as IDataPosts)
  );
};

export const handleProfileImageSubmit = (payload: { file: File }) =>
  async (dispatch: Dispatch, getState: () => any, { auth, storage }: IServices) => {
    if (!auth.currentUser) {
      return
    }
    const { uid } = auth.currentUser
    const storageRef = storage.ref()
    const response = await storageRef
      .child(`profileImages`)
      .child(`${uid}.jpg`)
      .put(payload.file)

    const url = await response.ref.getDownloadURL()
    dispatch(setProfileImage(url))
  };
