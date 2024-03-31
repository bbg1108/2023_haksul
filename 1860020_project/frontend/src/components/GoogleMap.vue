<template>
    <v-container>
      <v-row>
        <v-col>
          <v-text-field v-model="location" label="위치" id="textbar"></v-text-field>
        </v-col>
        <v-col>
          <v-btn @click="searchLocation" class="btn_gradient"><h1>⌕</h1></v-btn>
        </v-col>
      </v-row>
      <v-row class="my-0">
        <v-col>
          <v-card class="pa-2" outlined>
            <div id="map-canvas"></div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
    <!--
    <script async="false" type="text/javascript"
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC77x_P0LVvPV02N_nWJGP0Ed5WW8gCy3M">
    </script>-->
        <script>
        export default {
            name: 'map-canvas',
            data() {
                return {
                    map: null,
                    mapCenter: { lat: 35.105696, lng: 129.042857 },
                    storeMarker: null,
                    location: '',
                };
            },
            created(){
                this.$bus.$on('sendCordinate', this.moveMap)
                this.$bus.$on('placeCordinate', this.setPlaceMarker);
            },
            mounted(){
                this.initMap();
                this.setCenterMarker(this.mapCenter,"ce");
            },
            methods: {
                initMap() {
                    this.map = new google.maps.Map(document.getElementById("map-canvas"), { //getElementById로 map id 속성의 요소를 가져온다.
                        center: this.mapCenter, //center로 할 위도, 경도를 지정한다.
                        zoom: 10, //zoom size를 지정.
                        maxZoom: 20,
                        minZoom: 3,
                        streetViewControl: true,
                        mapTypeControl: true,
                        fuulscreenControl: true,
                        zoomControl: true,
                    });
                    this.$bus.$emit('sendCordinate', this.map.getCenter()); // 처음 마운트될 때 지도 중심점 좌표를 전달
                },

                moveMap(coordinate) {   // 좌표가 가리킨 곳으로 지도를 이동하는 함수
                    if (this.map){
                        this.map.panTo(coordinate) // 현재의 지도를 coordinate 좌표로 부드럽게 이동
                    }
                },

                createMarker(Points, Label) {   // 마커를 생성하는 함수
                    const markers = new google.maps.Marker({
                        position: Points,
                        map: this.map,
                        label: Label ? {
                            text: Label,
                            color: "#FFF",
                        } : null,  // Label이 존재하면 설정, 없으면 null
                    });
                    return markers; // 마커 반환
                },

                setCenterMarker(Points, Label) { // 지도에 중심좌표 마커를 찍는 함수
                    const markers = this.createMarker(Points, Label);   // 마커 생성
                    this.map.addListener('center_changed', () => {      // 지도의 중심점이 변경될 때 이벤트
                        markers.setPosition(this.map.getCenter())       // 마커를 지도의 새로운 중심점으로 위치함
                    });  
                    this.map.addListener('dragend', () => {
                        this.$bus.$emit('sendCordinate', this.map.getCenter());
                    });
                },
                
                setPlaceMarker(Points) {  // 지도에 편의시설이 위치한 마커를 찍는 함수
                    if (this.storeMarker) {  // 마커가 있으면 제거
                        this.storeMarker.setMap(null);
                    }
                    this.storeMarker = this.createMarker(Points);   // 마커 생성
                    this.storeMarker.setIcon('http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'); // 새 이미지 마커
                    this.storeMarker.setPosition(Points);
                },

                searchLocation() {  // 장소를 검색하는 함수
                    this.axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.location}&appid=67c78818c6afe50f6425fa397c98a955`)
                    .then((response)=>{
                        let data = response.data.coord
                        this.mapCenter = { lat: data.lat, lng: data.lon }
                        this.map.setCenter(this.mapCenter)
                        this.$bus.$emit('sendCordinate', this.map.getCenter());
                    })
                    .catch((error)=>{
                    console.log(error)
                })
                },
            },
        };
    </script>
    
    <style scoped>
        #map-canvas{
            width: 100%;
            height: 400px;
        }
        .btn_gradient {
            background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
            border: none;
            color: white;
        }
        #textbar{
            background-color: antiquewhite;
        }
    </style>