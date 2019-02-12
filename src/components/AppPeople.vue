<template>
	<div class="people">
		<h1>Star Wars People</h1>

		<br>

		<b-container class="bv-example-row">
			<b-row>
				<div>
					<b-form inline>
						<b-col>
							<b-input 
							class="mb-2 mr-sm-2 mb-sm-0" 
							placeholder="Search" 
							v-model="query" 
							@input="search()"
							/>
						</b-col>
						<b-col>
							<b-form-select v-model="gender" :options="gender_option" @change="search()" class="mb-3" />
						</b-col>

						<b-col>
							<b-form-select v-model="planet" :options="planets" @change="search()" class="mb-3" />
						</b-col>



					</b-form>
				</div>
			</b-row>
		</b-container>
		<br />

		<table class="table hover" >
			<thead>
				<tr>
					<th scope="col">Name</th>
					<th scope="col">Specie</th>
					<th scope="col">Home World</th>
					<th scope="col">Gender</th>
					<th scope="col">Birth year</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="people in peoples" :key="people.name" v-on:click="showModal(people.url)">
					<th scope="row">{{people.name}}</th>
					<td>{{people.species}}</td>
					<td>{{people.homeworld}}</td>
					<td>{{people.gender}}</td>
					<td>{{people.birth_year}}</td>

				</tr>
			</tbody>
		</table>


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

	export default {
		name: 'AppPeople',

		data() {

			return {
				peoples: [],
				numberOfPeoples:0,
				info: null,
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
			};

		},

		methods: {

			getPeoples(){
				apiService.getPeoples().then((data) => {
					this.peoples = data.results;
					this.numberOfPeoples= data.count;
				});
			},

			getPlanets(){
				axios.get('https://swapi.co/api/planets/').then(response => {
					let listPlanet = [{value: 'no', text: 'No filter'}];

					response.data.results.map(function(value) {
						listPlanet.push(
						{
							value: value.name, 
							text: value.name,
						}
						)
					});	
                this.planets = listPlanet
                });
			},


			getX(){

				axios.get('https://swapi.co/api/people/').then(response => {
					let list = [];


					response.data.results.map(function(value) {
						let specie = ''
						
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
				//const entity = this.selectedEntity
				console.log(gender, planet, query)
				
				axios.get(`https://swapi.co/api/people/?search=${query}`).then(res => {

					let list = [];

					res.data.results.map(function(value) {
						let specie = ''

						if((gender == 'male' && value.gender == 'male') || (gender == 'female' && value.gender == 'female') ) {
						
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

					});
					
					this.peoples = list
				}, err => {
					throw err
				})
			}, 500),

			capitalise (string) {
				return string.charAt(0).toUpperCase() + string.slice(1)
			},

		},

		mounted() {
			//this.getPeoples();
			this.getX();
			this.getPlanets();
		}
	}	
</script>