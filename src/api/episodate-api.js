import axios from "axios"

const EpisodateAPI = axios.create({
    baseURL: "https://www.episodate.com/api/",
    headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QzZUBleGVtcGxlLmNvbSIsInBhc3N3b3JkIjoiMTIzNDU2IiwiaWF0IjoxNTk1OTc0MTU5fQ.HV_NNCdwVeDXWYc7t6GOlr8RzItkV_fF_sIFZfd7x3E"
    }
})

export default EpisodateAPI