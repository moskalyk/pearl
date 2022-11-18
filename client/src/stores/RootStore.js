import { observable, action, configure, computed, runInAction, extendObservable, flow } from "mobx";
import {StreamStore} from './StreamStore.js'

export default class RootStore {
    config;

    constructor( config ) {
        this.config = config;
        // this.feedStore = new FeedStore( this );
        runInAction( () => {
            // this.networkStore.read( '' )
            // this.changeTheme( 'light' )
        } )
    }

    @action
    changeTheme( theme ) {
        console.log( `Changing THEME: ${theme}` );
        this.theme = theme
        this.networkStore.setFilterByTheme( theme )
    }
}