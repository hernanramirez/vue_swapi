<template>
	<div class="films">
		<h1>Star Wars Films</h1>
		<br>
		<b-container class="bv-example-row">
			<b-row>
				<div>
					<b-form inline>
						<b-col>
							<label class="sr-only" for="inlineFormInputName2">Search</label>
							<b-input class="mb-2 mr-sm-2 mb-sm-0" id="inlineFormInputName2" placeholder="Jane Doe" />
						</b-col>
						<b-col>
							
						</b-col>

					</b-form>
				</div>
			</b-row>
		</b-container>
		<br />

		<table class="table hover" >
			<thead>
				<tr>
					<th scope="col">Title</th>
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

	const apiService = new APIService();

	export default {
		name: 'AppFilms',

		data() {

			return {
				films: [],
				numberOfPeoples:0,
				info: null,
				current_film: {},
			};

		},

		methods: {

			getFilms(){

				apiService.getFilms().then((data) => {
					this.films = data.results;
				});

			},

			filmDetail(url){
				//console.log(url)
				this.$router.push({name: 'film_detail', params: { url: url } }) 
			},

		},

		mounted() {
			//this.getPeoples();
			this.getFilms();
			//this.getPlanets();
		}
	}	
</script>