  <template>
    <div class="crudcontacts">
      <h1>{{ msg }}</h1>

      <b-btn v-b-modal.modal1>Launch demo modal</b-btn>

      <!-- Modal Component -->
      <b-modal id="modal1" title="Bootstrap-Vue">
        <p class="my-4">Hello from modal!</p>
      </b-modal>

      <a href="#"><img src="../assets/images/logo.png" alt="" title="" /></a>

      <table class="table hover" >
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Heading</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="film in films" :key="film.episode_id">
            <th scope="row">{{film.episode_id}}</th>
            <td>{{film.director}}</td>
            
          </tr>
        </tbody>
      </table>

    </div>
  </template>

  <script>
    import {APIService} from '../APIService';

    const apiService = new APIService();

    export default {
      name: 'CrudContacts',
      props: {
        msg: String
      },
      data() {

        return {
          films: [],
          numberOfFilms:0,
        };

      },

      methods: {

        getContacts(){
          apiService.getContacts().then((data) => {
            this.films = data.results;
            this.numberOfFilms= data.count;
          });
        },
      },

      mounted() {
        this.getContacts();
      },
    }


  </script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
