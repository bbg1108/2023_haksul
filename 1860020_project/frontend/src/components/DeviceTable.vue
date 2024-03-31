<template>
  <div id="app">
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">{{dialogTitle}}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field label="장치번호" v-model="deviceInfo.deviceId" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="편의점명"  v-model="deviceInfo.name" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="위도"  v-model="deviceInfo.latitude" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="경도"  v-model="deviceInfo.longitude" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="전화번호"  v-model="deviceInfo.phone" required></v-text-field>
                </v-flex> 
                <v-flex xs12>
                  <v-text-field label="등록일"  v-model="deviceInfo.register_date" required></v-text-field>
                </v-flex> 
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="btnClick($event)">취소</v-btn>
            <v-btn color="blue darken-1" text @click="btnClick($event)">확인</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
	<v-btn color="primary" v-on:click.native="addContact()" class="btn_gradient">추가</v-btn>
	<v-data-table :headers="headers" :items="items" class="elevation-1">
		<template v-slot:item="row">
		<tr>
			<td>{{row.item.deviceId}}</td>
			<td>{{row.item.name}}</td>
			<td>{{row.item.latitude}}</td>
			<td>{{row.item.longitude}}</td>
			<td>{{row.item.phone}}</td>
			<td>{{row.item.register_date}}</td>
			<td class="text-xs-right">
				<v-btn color="primary" v-on:click.native="updateContact(row.item)" class="btn_gradient">수정</v-btn>&nbsp;
				<v-btn color="primary" v-on:click.native="deleteContact(row.item)" class="btn_gradient">삭제</v-btn>&nbsp;
				<v-btn color="primary" v-on:click.native="sendEvent({lat: row.item.latitude, lng: row.item.longitude})" class="btn_gradient">보기</v-btn>
			</td>
		</tr>
      </template>
	</v-data-table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      urlinfo:'http://127.0.0.1:8000/devices',
      deviceInfo:{
        _id: null,
        deviceId: null,
        name:null,
        latitude:null,
        longitude:null,
        phone:null,
        register_date: null,
      },
      dialog: false,
      dialogTitle:null,

      headers: [
        { text: '번호', align: 'left', value: 'deviceId'},
        { text: '편의점명', align: 'left', value: 'name'},
        { text: '위도', align: 'left',value: 'latitude'},
        { text: '경도', align: 'left',value: 'longitude'},
        { text: '전화번호', align: 'left', value: 'phone'},
		{ text: '등록일', align: 'left', value: 'register_date'},
		{ text: '관리', align: 'left', value: '' },
      ],
      items:[]
    }
  },
  created(){
    axios.get(this.urlinfo) //서버에 요청하기
    .then((res) => {
      console.log(res.data); //성공시
      this.items = res.data;
    })
    .catch((err) => {
      alert('에러 발생: ' + err); //에러 발생
    });
    this.$bus.$on('placeInfo', this.placeUpload);
  },
  methods:{
    placeUpload(data) {
      console.log('placeUpload called with data:', data);
      // 이전 데이터베이스의 deviceId 값을 가져와서 1을 더해줌
      axios.get(this.urlinfo)
        .then((response) => {
          const lastDeviceId = response.data.length > 0 ? response.data[response.data.length - 1].deviceId : 0; // DB에 데이터가 없으면 순번을 0으로 지정함
          console.log('번호: ', lastDeviceId)
          this.deviceInfo.deviceId = lastDeviceId + 1;
        
          axios.post(this.urlinfo, {
            deviceId: this.deviceInfo.deviceId,
            name: data.place_name,
            latitude: data.y,
            longitude: data.x,
            phone: data.phone,
            register_date: this.deviceInfo.register_date
          })
          .then((response) => {
            console.log(response.data);
            this.$set(this.items, this.items.length, response.data);
            alert("업데이트 성공");
          })
          .catch((error) => {
            console.error('에러 발생:', error);
            alert('에러 발생: ' + error);
          });
        })
        .catch((error) => {
          console.error('에러 발생:', error);
          alert('에러 발생: ' + error);
        });
    },
    
    addContact(){
      this.dialog = true;
      this.dialogTitle = "추가";
      this.deviceInfo.register_date = Date.now();
    },
    updateContact(data){
      this.dialog = true;
      this.dialogTitle = "수정";
      this.deviceInfo.deviceId = data.deviceId;
      this.deviceInfo.name = data.name;
      this.deviceInfo.latitude = data.latitude;
      this.deviceInfo.longitude = data.longitude;
      this.deviceInfo.phone = data.phone;
      this.deviceInfo.register_date = data.register_date;
    },
    deleteContact(data){
      this.dialog = true;
      this.dialogTitle = "삭제";
      this.deviceInfo.deviceId = data.deviceId;
      console.log('deleteContact : ' + data);
    },
    sendEvent(data){ // 보기 버튼
      //this.$bus.$emit('deviceSelected', data); 삭제할 것
      console.log(data)
      //const coordinate = { lat: data.lat, lng: data.lng }; // new google.maps.LatLng(Points.lat, Points.lng);
      const coordinate = new google.maps.LatLng(data.lat, data.lng);
      this.$bus.$emit('sendCordinate', coordinate);
    },

    btnClick($event){
      this.dialog = false;
      if($event.target.innerHTML == "확인"){
        if(this.dialogTitle =="추가"){ 
          axios.post(this.urlinfo,{ 
            deviceId: this.deviceInfo.deviceId, name: this.deviceInfo.name, latitude:  this.deviceInfo.latitude, longitude: this.deviceInfo.longitude, phone:  this.deviceInfo.phone
            , register_date:this.deviceInfo.register_date
          })
          .then(() => {
            axios.get(this.urlinfo) //서버에 요청하기
            .then((res) => {
              //console.log(res.data); //성공시
              this.items = res.data;
              alert("연락처 추가 성공");
            })
            .catch((err) => {
              alert('에러 발생: ' + err); //에러 발생
            });
            
          })
          .catch((err) => {
            alert('에러 발생: ' + err); //에러 발생
          });          
        }
        else if(this.dialogTitle=="수정"){
          //alert("입력된 정보 : " + "이메일 : " + this.contactInfo.email + " 패스워드 : " + this.contactInfo.password);
          axios.put(this.urlinfo + '/'+ this.deviceInfo.deviceId, { 
            deviceId: this.deviceInfo.deviceId, name: this.deviceInfo.name, latitude:  this.deviceInfo.latitude,
            longitude: this.deviceInfo.longitude, phone:  this.deviceInfo.phone, 
            register_date:this.deviceInfo.register_date
          })
          .then(() => {          
            axios.get(this.urlinfo) //서버에 요청하기
            .then((res) => { //성공시
              this.items = res.data;
              alert("업데이트 성공");
            })
            .catch((err) => {
              alert('에러 발생: ' + err); //에러 발생
            });
          })
          .catch((err) => {
            alert('에러 발생: ' + err); //에러 발생
          }); 

        }
        else {
          axios.delete(this.urlinfo + '/'+ this.deviceInfo.deviceId, { data: { deviceId: this.deviceInfo.deviceId } })
          .then((result) => { 
            console.log("삭제 후" + result); //성공시
            axios.get(this.urlinfo) //서버에 요청하기
            .then((res) => {
              this.items = res.data;
              alert("삭제 성공");
            })
            .catch((err) => {
              alert(' 삭제 후 데이터 가져오는 중 에러 발생: ' + err); //에러 발생
            });            
          })
          .catch((err) => { alert('에러 발생: ' + err); });          

        }
      }
      this.deviceInfo.deviceId = null;
      this.deviceInfo.name = null;
      this.deviceInfo.latitude = null;
      this.deviceInfo.longitude = null;
      this.deviceInfo.phone = null;
      this.deviceInfo.register_date = null;
    }

  }
}
</script>
<style scoped>
  div{
    margin:0 5px 0 5px;
  }
 .btn_gradient {
  background-image: linear-gradient(-225deg, #22E1FF 0%, #1D8FE1 48%, #625EB1 100%);
  border: none;
  color: white;
 }
</style>
