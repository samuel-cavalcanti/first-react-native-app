import axios from "axios"

const EpisodateAPI = axios.create({
    baseURL: "https://www.episodate.com/api/",
    headers:{
        
    }
})

export default EpisodateAPI