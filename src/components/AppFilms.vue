<template>
	<div class="films">
		<h1>Star Wars Films</h1>
	<br />

	<b-row>
      <b-col md="6" class="my-1">
        <b-form-group horizontal label="Filter" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Search by title" />
            <b-input-group-append>
              <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    
    </b-row>
    <br />

    <b-table show-empty
             stacked="md"
             :items="films"
             :fields="fields"
             :current-page="currentPage"
             :per-page="perPage"
             :filter="filter"
             @filtered="onFiltered"
    >

  
    <template slot="actions" slot-scope="row">
        <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
        <b-button size="sm" @click.stop="filmDetail(row.item.url)">
          Details
        </b-button>
    </template>

    
      
    </b-table>

<b-row>
      <b-col md="6" class="my-1">
        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
      </b-col>
    </b-row>

    <!--

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

    -->



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
				fields: [
                   { key: 'title', label: 'Film', sortable: true, sortDirection: 'desc' },
                   { key: 'episode_id', label: 'Episode', sortable: true, sortDirection: 'desc' },
                   { key: 'director', label: 'Director', sortable: true, sortDirection: 'desc' },
                   { key: 'release_date', label: 'Release Date', sortable: true, sortDirection: 'desc' },
                   { key: 'actions', label: 'Actions' },         
                ],
                currentPage: 1,
                perPage: 5,
                totalRows: 0,
                //pageOptions: [ 5, 10, 15 ],
                //sortBy: null,
                //sortDesc: false,
                //sortDirection: 'asc',
                filter: null,
			};

		},

		validations: {
			filter: {
				alpha,
				required,
				minLength: minLength(6)
			}
		},

		computed: {
            sortOptions () {
                // Create an options list from our fields
                return this.fields
                .filter(f => f.sortable)
                .map(f => { return { text: f.label, value: f.key } })
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

			getFilms(){

				apiService.getFilms().then((data) => {
					this.films = data.results;
					this.totalRows = this.films.length;
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
    
            onFiltered (filteredItems) {
                // Trigger pagination to update the number of buttons/pages due to filtering
                this.totalRows = filteredItems.length
                this.currentPage = 1
            },

		},

		mounted() {
			this.getFilms();
			this.getDirectors();
		}
	}	
</script>