import axios from 'axios';
// import * as types from './mutation-types';

export const getProjects = ({ commit }) => {
    const token = localStorage.getItem('@gswatcher:token')
    axios.get('https://api-gswatcher.herokuapp.com/api/projetos', {headers: {'Authorization': 'Bearer ' + token}}) //ip local para prevenir CORS
        .then(response => {
            commit('SET_PROJECTS', response.data);
        })
};

export const getProject = ({ commit }, projectId) => {
    const token = localStorage.getItem('@gswatcher:token')
    axios.get(`https://api-gswatcher.herokuapp.com/api/teste3/${projectId}`, {headers: {'Authorization': 'Bearer ' + token}})
        .then(response => {
            commit('SET_PROJECT', response.data);
        })
};

export const getDevProjects = ({ commit }, devId) => {
    const token = localStorage.getItem('@gswatcher:token')
    axios.get(`https://api-gswatcher.herokuapp.com/api/teste2/${devId}`, {headers: {'Authorization': 'Bearer ' + token}}) //ip local para prevenir CORS
        .then(response => {
            commit('SET_DEVPROJECTS', response.data);
        })
};

export const getunfinishedDevProjectsnfinished = ({ commit }, devId) => {
    const token = localStorage.getItem('@gswatcher:token')
    axios.get(`https://api-gswatcher.herokuapp.com/api/teste2/${devId}?hrs=null`, {headers: {'Authorization': 'Bearer ' + token}}) //ip local para prevenir CORS
        .then(response => {
            commit('SET_DEVPROJECTS_UNFINISHED', response.data);
        })
};

export const getDevelopers = ({ commit }) => {
    const token = localStorage.getItem('@gswatcher:token')
    axios.get('https://api-gswatcher.herokuapp.com/api/devs', {headers: {'Authorization': 'Bearer ' + token}}) //ip local para prevenir CORS
        .then(response => {
            commit('SET_DEVELOPERS', response.data);
        })
};

export const getProjectByDev = ({ commit }, devId, projId) => {
    const token = localStorage.getItem('@gswatcher:token')
    axios.get(`https://api-gswatcher.herokuapp.com/api/teste2/${devId}?proj=${projId}`, {headers: {'Authorization': 'Bearer ' + token}})
        .then(response => {
            commit('SET_PROJECTSBYDEV', response.data);
        })
};

export const getCompleteTask = ({ commit }) => {
    const token = localStorage.getItem('@gswatcher:token')
    axios.get('https://api-gswatcher.herokuapp.com/api/main_chart', {headers: {'Authorization': 'Bearer ' + token}}) //ip local para prevenir CORS
        .then(response => {
            commit('SET_COMPLTASKS', response.data);
        })
};

export const getCompleteTaskByDev = ({ commit }, devId) => {
    const token = localStorage.getItem('@gswatcher:token')
    axios.get(`https://api-gswatcher.herokuapp.com/api/chart_dev/${devId}`, {headers: {'Authorization': 'Bearer ' + token}}) //ip local para prevenir CORS
        .then(response => {
            commit('SET_COMPLTASKSBYDEV', response.data);
        })
};
// Alteração
export const getUser = ({ commit }) => {
    const token = localStorage.getItem('@gswatcher:token')
    axios.post('https://api-gswatcher.herokuapp.com/auth/authenticate', {headers: {'Authorization': 'Bearer ' + token}})
        .then(response => {
            commit('SET_USER', response.data)
        })
}

export const getToken = ({ commit }) => {
    const token = localStorage.getItem('@gswatcher:token')
    axios.post('https://api-gswatcher.herokuapp.com/auth/authenticate', {headers: {'Authorization': 'Bearer ' + token}})
        .then(response => {
            commit('SET_TOKEN', response.data)
        })
}