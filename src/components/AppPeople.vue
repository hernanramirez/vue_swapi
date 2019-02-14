<template>
	<div class="people">
		<h1>Star Wars People</h1>

		<br>

		<b-container class="bv-example-row">
			<b-row>
				
				<b-form inline>
					<b-col cols="6">

						<b-form-group id="exampleInputGroup1" label="Search by character or specie" label-for="exampleInput1">
							<b-form-input
							id="query"
							type="text"
							v-model="query"
							:state="$v.query.$dirty ? !$v.query.$error : null"
							@input="search()"
							placeholder="Search"
							/>
							<p v-if="!$v.query.required">The query field is required!</p>
							<p v-if="!$v.query.alpha">The input must be a proper alpha!</p>


						</b-form-group>

					</b-col>
					<b-col cols="3">
						<label>Filter by gender</label>
						<b-form-select v-model="gender" :options="gender_option" @change="search()" class="mb-3" />
					</b-col>

					<b-col cols="3">
						<label>Filter by planet</label>
						<b-form-select v-model="planet" :options="planets" @change="search()" class="mb-3" />
					</b-col>



				</b-form>
				
			</b-row>
		</b-container>
		<br />

		<table class="table hover" >
			<thead>
				<tr>
					<th @click="sort('name')" scope="col">Name</th>
					<th @click="sort('species')" scope="col">Specie</th>
					<th @click="sort('homeworld')" scope="col">Home World</th>
					<th @click="sort('gender')" scope="col">Gender</th>
					<th @click="sort('birth_year')" scope="col">Birth year</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="people in sortedPeoples" :key="people.name" v-on:click="showModal(people.url)">
					<th scope="row">{{people.name}}</th>
					<td>{{people.species}}</td>
					<td>{{people.homeworld}}</td>
					<td>{{people.gender}}</td>
					<td>{{people.birth_year}}</td>

				</tr>
			</tbody>
		</table>

		<p>
			<b-button @click="getPeoples(previous)" :disabled="previous == null" >Previus</b-button> 
			&nbsp;
			<b-button @click="getPeoples(next)" :disabled="next == null" >Next</b-button> 
		</p>

		debug: sort={{currentSort}}, dir={{currentSortDir}}


		<b-modal ref="myModalRef" hide-footer title="Star Wars" size="lg">
			<div class="d-block text-center">
				<h3>People Detail</h3>

				<b-container class="bv-example-row">
					<b-row>
						<b-col>
							<b>Name</b>	
						</b-col>
						
						<b-col>
							{{current_character.name}}	
						</b-col>
					</b-row>
					<b-row>
						<b-col>
							<b>Height</b>	
						</b-col>
						
						<b-col>
							{{current_character.height}}	
						</b-col>
					</b-row>
					<b-row>
						<b-col>
							<b>Mass</b>	
						</b-col>
						
						<b-col>
							{{current_character.mass}}	
						</b-col>
					</b-row>
					<b-row>
						<b-col>
							<b>Hair Color</b>	
						</b-col>
						
						<b-col>
							{{current_character.hair_color}}	
						</b-col>
					</b-row>
					<b-row>
						<b-col>
							<b>Skin Color</b>	
						</b-col>
						
						<b-col>
							{{current_character.skin_color}}	
						</b-col>
					</b-row>
					<b-row>
						<b-col>
							<b>Eye Color</b>	
						</b-col>
						
						<b-col>
							{{current_character.eye_color}}	
						</b-col>
					</b-row>
					<b-row>
						<b-col>
							<b>Birth year</b>	
						</b-col>
						
						<b-col>
							{{current_character.birth_year}}	
						</b-col>
					</b-row>
					<b-row>
						<b-col>
							<b>Gender</b>	
						</b-col>
						
						<b-col>
							{{current_character.gender}}	
						</b-col>
					</b-row>
				</b-container>

			</div>
			<b-btn class="mt-3" variant="outline-success" block @click="hideModal">Close Me</b-btn>
		</b-modal>

	</div>
</template>

<script>
	import {APIService} from '../APIService';
	import axios from 'axios';
	//import _debounce from 'lodash.debounce'

	const _debounce = require('lodash/debounce');

	const apiService = new APIService();

	import { required, alpha, minLength } from 'vuelidate/lib/validators';

	export default {
		name: 'AppPeople',


		data() {

			return {
				peoples: [],
				numberOfPeoples:0,
				planets: [],
				current_character: {},
				query: '',
				gender_option: [
				{ value: 'no', text: 'No filter' },
				{ value: 'male', text: 'Male' },
				{ value: 'female', text: 'Female' }
				],
				planet: '',
				gender: '',
				currentSort:'name',
				currentSortDir:'asc',
				next: '',
				previous: '',
				
			};

		},

		validations: {
			query: {
				alpha,
				required,
				minLength: minLength(6)
			}
		},

		computed:{
            sortedPeoples:function() {
                return this.peoples.sort((a,b) => {
                let modifier = 1;
                if(this.currentSortDir === 'desc') modifier = -1;
                if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
                if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
                return 0;
            });
            }
        },

		methods: {

			status(validation) {
				return {
					error: validation.$error,
					dirty: validation.$dirty
				}
			},

			getPlanets(){

                let listPlanet = [{value: 'no', text: 'No filter'}];

                var i;
                for (i = 0; i < 7; i++) { 

				axios.get('https://swapi.co/api/planets/?page='+i).then(response => {
					response.data.results.map(function(value) {
						listPlanet.push(
						{
							value: value.url, 
							text: value.name,
						}
						)
					});	
				});

			    }

				this.planets = listPlanet
			},


			getPeoples(url){
				
				if (this.next != '' || this.previous != ''){
					url = url;
				}else{
					url = 'https://swapi.co/api/people/'
				}

				console.log(this.previous, this.next, url);				

				axios.get(url).then(response => {
					let list = [];

					this.next = response.data.next;
					this.previous = response.data.previous;
					

					response.data.results.map(function(value) {
						let specie = ''
						
						axios.get(value.species).then(res => {
                            //console.log(res.data['name'])
                            specie=res.data['name']
                        });
						axios.get(value.homeworld).then(res_planet => {
							list.push(
							{
								'name': value.name, 
								'species': specie,
								'homeworld': res_planet.data.name,
								'hw': value.homeworld,
								'birth_year': value.birth_year,
								'gender': value.gender,
								'url': value.url
							}
							)
						});

					});
                 //console.log(list)
                 this.peoples = list

             });


			},

			getSpecie(url){
				return axios.get(url)
				.then(res => res.data['name'])
				.catch((error) => {
					console.error(error);
				});
			},

			getPlanet(url){
				return axios.get(url)
				.then(res => res.data['name'])
				.catch((error) => {
					console.error(error);
				});
			},

			showModal (url) {
				this.$refs.myModalRef.show(url);
				axios.get(url).then(res => {
					this.current_character = res.data;

				});
			},

			hideModal () {
				this.$refs.myModalRef.hide()
			},

			search: _debounce(function () {
				this.people = []
				const query = this.query
				const gender = this.gender
				const planet = this.planet


				
				axios.get(`https://swapi.co/api/people/?search=${query}`).then(res => {

					let list = [];
					this.next = res.data.next;
					this.previous = res.data.previous;

					res.data.results.map(function(value) {
						let specie = ''
						//console.log(gender.trim(), value.gender.trim())

						if( query !='' || gender.trim() === value.gender.trim() || planet.trim() === value.homeworld.trim()) {
							//console.log("inttermp", gender.trim(), value.gender.trim())

							axios.get(value.species).then(res => {
                              //console.log(res.data['name'])
                              specie=res.data['name']
                          });

							axios.get(value.homeworld).then(res => {

								list.push(
								{
									'name': value.name, 
									'species': specie,
									'homeworld': res.data.name,
									'birth_year': value.birth_year,
									'gender': value.gender,
									'url': value.url
								}
								)
							});

						}
						else if(gender.trim() === 'no' || planet.trim() === 'no') {
							console.log("inttermp", gender.trim(), value.gender.trim())

							axios.get(value.species).then(res => {
                              //console.log(res.data['name'])
                              specie=res.data['name']
                          });

							axios.get(value.homeworld).then(res => {

								list.push(
								{
									'name': value.name, 
									'species': specie,
									'homeworld': res.data.name,
									'hw': value.homeworld,
									'birth_year': value.birth_year,
									'gender': value.gender,
									'url': value.url
								}
								)
							});

						}
						

					});
					
					this.peoples = list
				}, err => {
					throw err
				})
			}, 500),

			capitalise (string) {
				return string.charAt(0).toUpperCase() + string.slice(1)
			},

			sort:function(s) {
                //if s == current sort, reverse
                if(s === this.currentSort) {
                    this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
                }
                this.currentSort = s;
            }, 

			sortedPeople:function() {
				return this.peoples.sort((a,b) => {
					let modifier = 1;
					if(this.currentSortDir === 'desc') modifier = -1;
					if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
					if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
					return 0;
				}).filter((row, index) => {
					let start = (this.currentPage-1)*this.pageSize;
					let end = this.currentPage*this.pageSize;
					if(index >= start && index < end) return true;
				});
			}

		},

		mounted() {
			this.getPeoples('');
			this.getPlanets();
		}
	}	
</script>
