<template>
  <div id="app">
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">{{dialogTitle}}</span>
          </v-card-title>
          <v-card-text>
            <v-row wrap>
              <v-col cols="12">
                <v-text-field label="아이디" v-model="deviceInfo.username" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="비밀번호" v-model="deviceInfo.password" required></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="btnClick($event)">취소</v-btn>
            <v-btn color="blue darken-1" text @click="btnClick($event)">확인</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-btn class="btn_gradient" @click.native="addContact()">회원가입</v-btn>
  </div>
</template>
  
  <script>
  import axios from 'axios'
  export default {
    data () {
      return {
        urlinfo:'http://127.0.0.1:8000/logins',
        deviceInfo:{
            username:null,
            password:null,
        },
        dialog: false,
        dialogTitle:null,
      }
    },
    methods:{
      addContact(){
        this.dialog = true;
        this.dialogTitle = "회원가입";
        this.deviceInfo.register_date = Date.now();
      },
      btnClick($event){
        this.dialog = false;
        if($event.target.innerHTML == "확인"){ 
            axios.post(this.urlinfo,{ 
              username: this.deviceInfo.username, password: this.deviceInfo.password 
            },{withCredentials:true})
            .then(() => {
              axios.get(this.urlinfo,{withCredentials:true}) //서버에 요청하기
              .then((res) => {
                //console.log(res.data); //성공시
                alert("회원가입이 성공되었습니다.");
              })
              .catch((err) => {
                alert('에러 발생: ' + err); //에러 발생
              });
              
            })
            .catch((err) => {
              alert('에러 발생: ' + err); //에러 발생
            });          
        }
        this.deviceInfo.username = null;
        this.deviceInfo.password = null;
      }  
    }
  }
  </script>
  <style scoped>
    div{
      margin: 5px 0 5px;
    }
    .btn_gradient {
  background: linear-gradient(to right, rgb(242, 112, 156), rgb(255, 148, 114));
  border: none;
  color: rgb(255, 255, 255);
  width: 100%;
 }
  </style>
  