import ShowAPI from "../api/show-api"
import { useEffect, useContext } from "react"
import { AppContext, Actions } from "../context/app-context"

const useShows = () => {
    const { state, dispatch } = useContext(AppContext)


    const getShowsCallback = (response) => {

        const action = Actions.createAction(Actions.createShows, response.data)

        dispatch(action)

    }

    useEffect(() => {
        ShowAPI.get("/shows").then(getShowsCallback.bind(this))
    }, [state.resync])



    const addShow = async (show) => {

        console.info(show)

        return

        const response = await ShowAPI.post("/shows", show)

        console.info("response add Show", response.data)

        const action = Actions.createAction(Actions.addItem, response.data)
        dispatch(action)
    }


    return { shows: state.shows, addShow }
}




export default useShows
