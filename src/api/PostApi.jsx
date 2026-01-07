import axios from "axios";

const api = axios.create({
    baseURL : "https://jsonplaceholder.typicode.com"
})

// get function axios

export const getApi = () =>{
    return api.get("/posts")
}

// Delete function axiox

export const deleteApi = (id) => {
    return api.delete(`/posts/${id}`)
}

// add function axios

export const addApi = (post) => {
    return api.post("/posts",post)
}


// updateApi axios 

export const updateApi = (id , post) => {
    return api.put(`/posts/${id}`,post)
}

