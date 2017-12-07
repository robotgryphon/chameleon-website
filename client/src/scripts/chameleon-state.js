import { createStore } from 'redux';
import PolymerRedux from './polymer-redux-fork';

let defaultState = {
    user: {
        uid: '',
        displayName: 'Guest',
        isAdmin: false,
        isLoggedIn: false
    }
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'AUTH_CHANGED':
            // ALWAYS return new state
            return Object.assign({}, state, {
                user: action.user // New message
            });

        // Return the state, nothing changed.
        default:
            return state;
    }
};

const store = createStore(reducer, defaultState);

// Create the PolymerRedux mixin
const ReduxMixin = PolymerRedux(store);

export default ReduxMixin;