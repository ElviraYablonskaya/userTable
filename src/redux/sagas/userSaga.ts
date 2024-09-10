import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { User } from '../../@types';
import { fetchUsersFailure, fetchUsersRequest, fetchUsersSuccess } from '../reducers/userSlice';


function* fetchUsersSaga() {
    try {
        const response: { data: User[] } = yield call(axios.get, 'https://jsonplaceholder.typicode.com/users');
        const users: User[] = response.data;
        yield put(fetchUsersSuccess(users));
    } catch (error) {
        yield put(fetchUsersFailure('Failed to fetch users'));
    }
}
export default function* usersSaga() {
    yield takeLatest(fetchUsersRequest.type, fetchUsersSaga);
}
