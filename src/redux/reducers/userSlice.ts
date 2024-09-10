import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../@types';


interface UsersState {
    users: User[];
    filteredUsers: User[];
    loading: boolean;
    error: string | null;
    filters: {
        name: string;
        username: string;
        email: string;
        phone: string;
    };
}

const initialState: UsersState = {
    users: [],
    filteredUsers: [],
    loading: false,
    error: null,
    filters: {
        name: '',
        username: '',
        email: '',
        phone: '',
    },
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        fetchUsersRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchUsersSuccess(state, action: PayloadAction<User[]>) {
            state.loading = false;
            state.users = action.payload;
            state.filteredUsers = action.payload;
        },
        fetchUsersFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        setFilters(state, action: PayloadAction<Partial<UsersState['filters']>>) {
            state.filters = { ...state.filters, ...action.payload };
            state.filteredUsers = state.users.filter(user =>
                Object.entries(state.filters).every(([key, value]) =>
                    (user as any)[key].toLowerCase().includes(value.toLowerCase())
                )
            );
        },
    },
});

export const {
    fetchUsersRequest,
    fetchUsersSuccess,
    fetchUsersFailure,
    setFilters,
} = usersSlice.actions;

export default usersSlice.reducer;
