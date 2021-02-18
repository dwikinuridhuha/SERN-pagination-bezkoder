import http from "../utils/http-common";

const getAll = (params) => {
    return http.get("/tutorials", {params});
};

const getId = (id) => {
    return http.get(`/tutorials/${id}` );
};

const create = (data) => {
    return http.post("/tutorials", data );
};

const update = (id, data) => {
    return http.put(`/tutorials/${id}`, data );
};

const remove = (id) => {
    return http.delete(`/tutorials/${id}` );
};

const findByTitle = (title) => {
    return http.get(`/tutorials?=title=${title}` );
};


export default {
    getAll,
    getId,
    create,
    update,
    remove,
    findByTitle
}