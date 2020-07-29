import EpisodateAPI from "../api/episodate-api"
import {useContext, useEffect} from "react"
import {Actions, AppContext} from "../context/app-context"

const useShows = () => {
    const {state, dispatch} = useContext(AppContext)


    const getShowsCallback = (response) => {

        const action = Actions.createAction(Actions.createShows, response.data["tv_shows"])

        dispatch(action)

    }

    useEffect(() => {
        if (state.reSync === null)
            EpisodateAPI.get("/most-popular").then(getShowsCallback.bind(this))
    }, [state.reSync])


    const addShow = async (show) => {

        console.info("search show: ", show)

        const response = await EpisodateAPI.get(`/show-details?q=${show.name}`, show)


        const new_show = {}

        Object.keys(show).forEach((key) => {
            new_show[key] = response.data["tvShow"][key]

        })
        new_show.id = response.data["tvShow"].id
        new_show.description = show.description


        const old_show = state.shows.filter((show) => show.id === new_show.id)

        console.info(old_show)

        if (old_show.length)
            return

        const action = Actions.createAction(Actions.addItem, new_show)
        dispatch(action)
    }


    return {shows: state.shows, addShow}
}


export default useShows
