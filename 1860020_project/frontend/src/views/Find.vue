<template>
  <div>
    <v-container fluid class="main_gradient">
        <v-row>
            <v-col>
                <device-table/>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-row>
                    <current-weather/>
                </v-row>
                <v-row>
                    <category/>
                </v-row>
            </v-col>
            <v-col>
                <google-map/>             
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <place-list/>
            </v-col>
        </v-row>
    </v-container>
  </div>
</template>
<script>
import DeviceTable from '../components/DeviceTable';
import GoogleMap from '../components/GoogleMap';
import CurrentWeather from '../components/CurrentWeather';
import PlaceList from '../components/PlaceList';
import Category from '../components/Category';

export default {
  name: 'App',
  components: {
    DeviceTable,
    CurrentWeather,
    GoogleMap,
    PlaceList,
    Category
  },
  data: () => ({
    //
  }),
  methods:{
    dateUpdate(date){
        alert(date);
    }
  }
}
</script>

<style scoped>
.main_gradient {
    background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
    border: none;
    color: white;
}</style>