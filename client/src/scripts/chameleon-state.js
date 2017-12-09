import { createStore } from 'redux';
import PolymerRedux from './polymer-redux-fork';

let guestState = {
    uid: '',
    displayName: 'Guest',
    isAdmin: false,
    isLoggedIn: false
};

let defaultState = {
    user: guestState
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'AUTH_CHANGED':
            // ALWAYS return new state
            return Object.assign({}, state, {
                user: action.user // New message
            });

        case 'USER_LOGGED_OUT':
            console.log("user logout event");
            return Object.assign({}, state, { user: guestState });

        // Return the state, nothing changed.
        default:
            return state;
    }
};

const store = createStore(reducer, defaultState);

// Create the PolymerRedux mixin
const ReduxMixin = PolymerRedux(store);

export default ReduxMixin;