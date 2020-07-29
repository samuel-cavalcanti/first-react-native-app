import { createContext } from "react"

const AppContext = createContext()

const Actions = {
    createShows: "createShows",
    setItemSelected: "setItemSelected",
    addItem: "addItem",

    createAction: (type, payload) => {
        return { type, payload }
    }
}

const appReducer = (state, action) => {

    switch (action.type) {

        case Actions.createShows:
            return { ...state, shows: action.payload }

        case Actions.setItemSelected:
            return { ...state, itemSelected: action.payload }

        case Actions.addItem:
            const shows = state.shows
            shows.push(action.payload)
            return { ...state, shows, reSync: action.payload }

        default:
            return state


    }

}

const initialState = {
    shows: [],
    itemSelected: null,
    reSync: null
}



export { AppContext, initialState, appReducer, Actions }