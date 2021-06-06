import axios from 'axios';
// import * as types from './mutation-types';

export const getProjects = ({ commit }) => {
    axios.get('https://api-gswatcher.herokuapp.comapi/projetos') //ip local para prevenir CORS
        .then(response => {
            commit('SET_PROJECTS', response.data);
        })
};

export const getProject = ({ commit }, projectId) => {
    axios.get(`https://api-gswatcher.herokuapp.com/api/teste3/${projectId}`)
        .then(response => {
            commit('SET_PROJECT', response.data);
        })
};

export const getDevProjects = ({ commit }, devId) => {
    axios.get(`https://api-gswatcher.herokuapp.com/api/teste2/${devId}`) //ip local para prevenir CORS
        .then(response => {
            commit('SET_DEVPROJECTS', response.data);
        })
};

export const getunfinishedDevProjectsnfinished = ({ commit }, devId) => {
    axios.get(`https://api-gswatcher.herokuapp.com/api/teste2/${devId}?hrs=null`) //ip local para prevenir CORS
        .then(response => {
            commit('SET_DEVPROJECTS_UNFINISHED', response.data);
        })
};

export const getDevelopers = ({ commit }) => {
    axios.get('https://api-gswatcher.herokuapp.com/api/devs') //ip local para prevenir CORS
        .then(response => {
            commit('SET_DEVELOPERS', response.data);
        })
};

export const getProjectByDev = ({ commit }, devId, projId) => {
    axios.get(`https://api-gswatcher.herokuapp.com/api/teste2/${devId}?proj=${projId}`)
        .then(response => {
            commit('SET_PROJECTSBYDEV', response.data);
        })
};

export const getCompleteTask = ({ commit }) => {
    axios.get('https://api-gswatcher.herokuapp.com/api/main_chart') //ip local para prevenir CORS
        .then(response => {
            commit('SET_COMPLTASKS', response.data);
        })
};

export const getCompleteTaskByDev = ({ commit }, devId) => {
    axios.get(`https://api-gswatcher.herokuapp.com/api/chart_dev/${devId}`) //ip local para prevenir CORS
        .then(response => {
            commit('SET_COMPLTASKSBYDEV', response.data);
        })
};
// Alteração
export const getUser = ({ commit }) => {
    axios.post('https://api-gswatcher.herokuapp.com/auth/authenticate')
        .then(response => {
            commit('SET_USER', response.data)
        })
}

export const getToken = ({ commit }) => {
    axios.post('https://api-gswatcher.herokuapp.com/auth/authenticate')
        .then(response => {
            commit('SET_TOKEN', response.data)
        })
}