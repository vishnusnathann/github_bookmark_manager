import {
    ADD_REPO,
    REMOVE_REPO
} from './types';

export default (state, action) => {
	switch (action.type) {
        case ADD_REPO:
            return(
                [ ...state,action.payload]
            );
        case REMOVE_REPO:
            return(
                state.filter((item) => item.id !== action.payload.id)
            )
        default:
            return state;
    }}