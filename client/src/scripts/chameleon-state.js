import { createStore } from 'redux';
import PolymerRedux from './polymer-redux-fork';

import firebase from '@firebase/app';
import '@firebase/auth';

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
            firebase.auth().signOut();
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