<template>
	<div class="people">
		<h1>Star Wars People</h1>

		<b-container class="bv-example-row">

			<div class="row">
    <div class="col-sm">
      One of three columns
    </div>
    <div class="col-sm">
      One of three columns
    </div>
    <div class="col-sm">
      One of three columns
    </div>
  </div>

<!--
			<b-row>
				<b-col>
					<input aria-label="Enter search query" placeholder="Search query" v-model="query"/>
				</b-col>
				<b-col>
					<b-form-select v-model="planet" @change="addThing(thing)">
						<option v-for="planet in planets" v-bind:value="planet" @>{{ planet.name }}</option>
					</b-form-select>
				</b-col>
				
				<b-col>

					
			</b-row>
		-->
		</b-container>

		

		Total:{{numberOfPeoples}}

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
				<tr v-for="people in peoples" :key="people.name">
					<th scope="row">{{people.name}}</th>
					<td>{{people.species}}</td>
					<td>{{people.homeworld}}</td>
					<td>{{people.gender}}</td>
					<td>{{people.birth_year}}</td>

				</tr>
			</tbody>
		</table>

	</div>
</template>

<script>
	import {APIService} from '../APIService';
	import axios from 'axios';

	const apiService = new APIService();

	export default {
		name: 'AppPeople',

		options: [
		{ value: 1, text: 'One' },
		{
			label: 'Group 1',
			options: [
			{ value: 3, text: 'Three' },
			{ value: 4, text: 'Four', disabled: true },
			{ value: 5, text: 'Five' },
			],
		},
		{
			label: 'Group 2',
			options: [
			{ value: 6, text: 'Six' },
			{ value: 7, text: 'Seven' },
			{ value: 8, text: 'Eight' },
			],
		},
		],
		value: [1],
		multiple: true,
		search: true,
		controls: true,
		
		data() {

			return {
				peoples: [],
				numberOfPeoples:0,
				info: null,
				planets: []
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
				apiService.getPlanets().then((data) => {
					this.planets = data.results;
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
								'gender': value.gender
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
		},

		mounted() {
			//this.getPeoples();
			this.getX();
			this.getPlanets();
		}
	}	
</script>