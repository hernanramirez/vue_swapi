<template>
	<div class="films">
		<h1>Star Wars Films</h1>
	<br />

	<table class="table hover" >
		<thead>
			<tr>
				<th @click="sort('title')" scope="col">Title</th>
				<th scope="col">Episode ID</th>
				<th scope="col">Director</th>
				<th scope="col">Release Date</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="film in films" :key="film.url" v-on:click="filmDetail(film.url)">
				<th scope="row">{{film.title}}</th>
				<td>{{film.episode_id}}</td>
				<td>{{film.director}}</td>
				<td>{{film.release_date}}</td>
			</tr>
		</tbody>
	</table>


</div>
</template>

<script>
	import {APIService} from '../APIService';
	import axios from 'axios';
	import { required, alpha, minLength } from 'vuelidate/lib/validators';

	const _debounce = require('lodash/debounce');

	const apiService = new APIService();

	export default {
		name: 'AppFilms',

		data() {

			return {
				films: [],
				directors: [],
				director:'',
				episodes: ['No filter',1, 2, 3, 4, 5, 6, 7],
				numberOfPeoples:0,
				info: null,
				current_film: {},
				date: '',
				query: '',
				currentSort:'name',
                currentSortDir:'asc',
                next: null,
                previous: null,
                from: '',
                to: '',

			};

		},


		validations: {
			query: {
				alpha,
				required,
				minLength: minLength(6)
			}
		},

		methods: {

			
			getDirectors(){
				axios.get('https://swapi.co/api/films/').then(response => {
					let control = [];
					let listDirectors = [{value: 'no', text: 'No filter'}];

					response.data.results.map(function(value) {

						if(!control.includes(value.director)){
							control.push(value.director)
							listDirectors.push(
							{
								value: value.url, 
								text: value.director,
							}
							)
						}
					});
					

					this.directors = listDirectors
				});
			},

			getFilms(search, episode, directo, from, to){

				apiService.getFilms().then((data) => {
					this.films = data.results;
				});

			},

			filmDetail(url){
				this.$router.push({name: 'film_detail', params: { url: url } }) 
			},

			search: _debounce(function () {
				this.people = []
				const query = this.query
					
				axios.get(`https://swapi.co/api/films/?search=${query}`).then(res => {

					this.films = res.data.results
				}, err => {
					throw err
				})
			}, 500),

		},

		mounted() {
			this.getFilms("","","","","");
			this.getDirectors();
		}
	}	
</script>