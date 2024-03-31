<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="10">
          <v-card class="pa-4" outlined>
            <div class="location">{{ location }}</div>
            <div class="weather">{{weather}}</div>
            <div class="temperature">{{ temperature }}℃</div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>

<script>
    export default {
        name: 'current-weather',
        data(){
            return{
                location:'',        // 장소
                weather:'',         // 날씨
                temperature:0,      // 기온
                lat:37.566535,      // 위도
                lng:126.977969,     // 경도
            }
        },
        created(){
            this.$bus.$on('sendCordinate', this.setCordinate)
        },
        methods:{
            setCordinate(cordinate) {   // 좌표(위도, 경도)를 설정하는 함수
                this.lat = cordinate.lat()
                this.lng = cordinate.lng()
                this.getWeather(this.lat, this.lng)
            },

            getWeather(lat, lng) {  // 날씨 정보를 얻는 함수
                this.axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=67c78818c6afe50f6425fa397c98a955`)
            .then((response)=>{
                let data = response.data
                this.location = data.name
                this.weather = data.weather[0].main // clear,clouds...
                this.temperature = (data.main.temp-273.15).toFixed(1)
            })
            .catch((error)=>{
                console.log(error)
            })
            },
        }
    }
</script>

<style scoped>
	.location {
		text-align : center;
		font-size : 40pt;
		color : black;
        margin-top:40px;
	}
	.weather{
		text-align : center;
		font-size : 20pt;
		font-weight : 100;
		color : black;
	}
	.temperature{
		text-align : center;
		font-size : 50pt;
		font-weight : 100;
		color : black;
	}
</style>