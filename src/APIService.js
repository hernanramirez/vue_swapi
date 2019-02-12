import axios from 'axios';
const API_URL = 'https://swapi.co/api';

export default {
}

export class APIService {

	constructor(){

	}

    getContacts() {
        const url = `${API_URL}/films/`;
        return axios.get(url).then(response => response.data);
    }

    getPeoples() {
        const url = `${API_URL}/people/`;
        return axios.get(url).then(response => response.data);
    }

    getPlanets() {
        const url = `${API_URL}/planets/`;
        return axios.get(url).then(response => response.data);
    }

    getFilms() {
        const url = `${API_URL}/films/`;
        return axios.get(url).then(response => response.data);
    }

}