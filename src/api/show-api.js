import axios from "axios"

const ShowAPI = axios.create({
    baseURL: "http://192.168.1.14:3090",
    headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QzZUBleGVtcGxlLmNvbSIsInBhc3N3b3JkIjoiMTIzNDU2IiwiaWF0IjoxNTk1OTc0MTU5fQ.HV_NNCdwVeDXWYc7t6GOlr8RzItkV_fF_sIFZfd7x3E"
    }
})

export default ShowAPI