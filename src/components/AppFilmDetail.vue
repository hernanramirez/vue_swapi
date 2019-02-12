<template>
	<div class="films">
		<table>
			<tr>
				<td valign="top"><img v-bind:src=poster_view></td>
				<td valign="top">


					<center><h1>Star Wars Detail Films</h1></center>

					<div align="ljustify">

						<b-container class="bv-example-row">
							<b-row>
								<b-col>
									<b>Tilte</b><br/>
									{{film_detail.title}}	
								</b-col>
							</b-row>

							<b-row>
								<b-col>
									<b>Episode</b> {{film_detail.episode_id}}	
								</b-col>
							</b-row>
							<b-row>
								<b-col>
									<b>Opening Crawl</b><br/><br/>	
									{{film_detail.opening_crawl}}	
								</b-col>
							</b-row>
							<b-row>
								<b-col>
									<b>Director</b> {{film_detail.director}}	
								</b-col>
							</b-row>
							<b-row>
								<b-col>
									<b>Producer</b> {{film_detail.producer}}	
								</b-col>
							</b-row>
							<b-row>
								<b-col>
									<b>Release Date</b> {{film_detail.release_date}}	
								</b-col>
							</b-row>
						</b-container>


						<h3>Characters</h3>
						<table class="table hover" >
							<thead>
								<tr>
									<th scope="col">Name</th>

								</tr>
							</thead>
							<tbody>
								<tr v-for="character in characters" :key="character.url" v-on:click="showModal(character.url)">
									<th scope="row">{{character.name}}</th>
								</tr>
							</tbody>
						</table>

					</div>

				</td>
			</tr>
		</table>

		
		<b-modal ref="myModalRef" hide-footer title="Star Wars" size="lg">
			<div class="d-block text-center">
				<h3>Character Detail</h3>

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
	//import {APIService} from '../APIService';
	import axios from 'axios';

	//const apiService = new APIService();

	export default {
		name: 'AppFilms',

		data() {

			return {
				film_detail: {},
				poster_view: '',
				characters: [],
				current_character: {},
				poster: [
				{   
					value: '1', 
					url: 'https://lumiere-a.akamaihd.net/v1/images/Star-Wars-New-Hope-IV-Poster_c217085b.jpeg' 
				},
				{   
					value: '2', 
					url: 'https://lumiere-a.akamaihd.net/v1/images/Star-Wars-Empire-Strikes-Back-V-Poster_878f7fce.jpeg' 
				},
				{   
					value: '3', 
					url: 'https://lumiere-a.akamaihd.net/v1/images/Star-Wars-Attack-Clones-II-Poster_53baa2e7.jpeg' 
				},

				{   
					value: '4', 
					url: 'https://lumiere-a.akamaihd.net/v1/images/avco_payoff_1-sht_v7_lg_32e68793.jpeg' 
				},

				{   
					value: '5', 
					url: 'https://lumiere-a.akamaihd.net/v1/images/Star-Wars-Return-Jedi-VI-Poster_a10501d2.jpeg' 
				},

				{   
					value: '3', 
					url: 'https://lumiere-a.akamaihd.net/v1/images/Star-Wars-Attack-Clones-II-Poster_53baa2e7.jpeg' 
				},

				{   
					value: '3', 
					url: 'https://lumiere-a.akamaihd.net/v1/images/Star-Wars-Attack-Clones-II-Poster_53baa2e7.jpeg' 
				},

				]
			};

		},

		methods: {

			getFilmDetail(url){

				let characters_list = []
				axios.get(url).then(res => {

					this.film_detail = res.data;
					
					if (res.data.episode_id == '4'){
						this.poster_view = this.poster[0]['url']
					}else if (res.data.episode_id == '5') {
						this.poster_view = this.poster[1]['url']
					}else if (res.data.episode_id == '2') {
						this.poster_view = this.poster[2]['url']
					}else if (res.data.episode_id == '7') {
						this.poster_view = this.poster[3]['url']
					}else if (res.data.episode_id == '6') {
						this.poster_view = this.poster[4]['url']
					}else if (res.data.episode_id == '5') {
						this.poster_view = this.poster[5]['url']
					}else if (res.data.episode_id == '5') {
						this.poster_view = this.poster[6]['url']
					}


					
					res.data.characters.map(function(value) {

						axios.get(value).then(characters => {
							//console.log(characters.data)
							characters_list.push(
							{
								'name': characters.data.name, 
								'url': characters.data.url
							}
							)

						});

					});
					
				});

				this.characters = characters_list;

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

		},

		

		mounted() {
			let url = this.$route.params.url
			//this.getPeoples();
			this.getFilmDetail(url);
			//this.getPlanets();


		}
	}	
</script>