<template>
    <div id="placeList">
        <ul>
            <v-container>
              <v-row>
                <v-col v-for="(place, index) in places" :key="index" cols="12" md="6" lg="4">
                  <v-card class="gradient1">
                    <v-card-title>{{ place.place_name }}</v-card-title>
                    <v-card-text>
                      <p>카테고리: {{ place.category_name }}</p>
                      <p>주소: {{ place.address_name }}</p>
                      <p>거리: {{ place.distance }} 미터</p>
                      <p>Phone: {{ place.phone || 'N/A' }}</p>
                      <p>사이트: <a :href="place.place_url" target="_blank">View on Site</a></p>
                      <p>위도: {{ place.y }}</p>
                      <p>경도: {{ place.x }}
                        <v-row>
                         <v-col class="text-right" cols="12">
                          <v-btn color="primary" @click="placeCoordinate({ lat: parseFloat(place.y), lng: parseFloat(place.x) })" class="btn_gradient">위치</v-btn>&nbsp;
                          <v-btn color="primary" @click="emitPlaceUpload(place)" class="btn_gradient">저장</v-btn>
                         </v-col>
                        </v-row>
                      </p>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
        </ul>
    </div>
    
</template>

<script>
    export default {
        name: 'placelist',
        data() {
            return{
                places: [],
                lat:37.566535,      // 위도
                lng:126.977969,     // 경도
                code: '',           // 카테고리 코드
                radius: 1000,       // 반경
            }
        },
        created() {
            this.$bus.$on('categoryCode', (code) => {
                this.code = code
            });
            this.$bus.$on('sendRadius', (radius) => {
                this.radius = radius
            });
            this.$bus.$on('sendCordinate', this.setCordinate);
        },
        methods: {
            setCordinate(cordinate) {   // 좌표(위도, 경도)를 설정하는 함수
                this.lat = cordinate.lat()
                this.lng = cordinate.lng()
                //console.log("code: ", this.code);  // 코드 추가
                this.getPlace(this.code, this.radius, this.lat, this.lng)
            },

            emitPlaceUpload(data) { // 편의시설의 정보를 전달
                this.$bus.$emit('placeInfo', data)
            },

            placeCoordinate(data) { // 편의시설의 좌표를 전달
                this.$bus.$emit('placeCordinate', data)
            },

            getPlace(code, radius, lat, lng) {  // api와 axios를 이용하여 편의시설의 정보를 받음
                console.log("code: ", this.code);
                console.log("radius: ", radius);
                if (code && radius) { // code와 radius 값을 받을 경우 실행
                const headers = {"Authorization": "KakaoAK 9aedc4dd00c733ade692318d70f238f0"}
                this.axios.get(`https://dapi.kakao.com/v2/local/search/category.json?&category_group_code=${code}&x=${lng}&y=${lat}&page=1&radius=${radius}`, { headers })
            .then((response)=> {
                let data = response.data
                this.places = data.documents
            })
            .catch((error)=>{
                console.log(error)
            }) }
            },
        }
    }
</script>

<style scoped>
.storeList {
		text-align : center;
		font-size : 30pt;
		color : black;
        margin-top:40px;
	}
.btn_gradient {
    background-image: linear-gradient(-225deg, #22E1FF 0%, #1D8FE1 48%, #625EB1 100%);
  border: none;
  color: white;
 }
</style>