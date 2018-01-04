import firebase from '@firebase/app';
import '@firebase/auth';

import "../bower_components/polymer/polymer-element.html";

import { firebaseConfig } from './scripts/config.js';
import ChameleonState from './scripts/chameleon-state.js';

class ChameleonShell extends ChameleonState(Polymer.Element) {
    static get is() {
        return 'chameleon-app';
    }

    static get properties() {
        return {
            page: String,
            metaState: String,
            urlData: {
                type: Object,
                observer: "_urlChanged"
            }
        }
    }

    static get actions() {
        return {
            authChanged(user) {
                return 
            }
        }
    }

    constructor() {
        super();
        this.metaState = "loading";
        this.page = "meta";

        firebase.initializeApp(firebaseConfig);
        firebase.auth().onAuthStateChanged(this.authChanged.bind(this));
    }

    connectedCallback() {
        super.connectedCallback();

        this.pageController = this.shadowRoot.querySelector("iron-pages");
    }

    ready() {
        super.ready();                
        this.removeAttribute('unresolved');
    }

    async authChanged(user) {
        if(user) {
            let admins = firebase.firestore().collection('admins');
            let userAdmin = await admins.doc(user.uid).get();
            if(userAdmin.exists) {
                this.dispatch({
                    type: 'AUTH_CHANGED',
                    user: {
                        isAdmin: true,
                        uid: user.uid,
                        displayName: user.displayName,
                        isLoggedIn: true
                    }
                });
            }
        }
    }

    _urlChanged(newPage) {

        if(!this.pageController) this.pageController = this.shadowRoot.querySelector("iron-pages");

        // Fallback to home route if not defined otherwise
        if(!this.urlData || !this.urlData.page || this.urlData.page == '/') {
            this.urlData = { page: "home" };
            return;
        }

        let node = this.pageController.querySelector(`[page=${newPage.page}]`);
        if(!node) {
            this.metaState = "loading";
            this.page = "meta";

            import('./modules/chameleon-' + newPage.page)
                .then(_ => {
                    let newNode = document.createElement('chameleon-' + newPage.page);
                    newNode.setAttribute('page', newPage.page);
                    this.pageController.appendChild(newNode);
                    this.page = newPage.page;
                })
                
                .catch(_ => this.metaState = "not-found");
        } else {
            this.page = newPage.page;
        }
    }
}

customElements.define(ChameleonShell.is, ChameleonShell);