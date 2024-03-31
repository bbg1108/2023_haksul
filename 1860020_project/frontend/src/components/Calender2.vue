<template>
  <v-app>
    <v-container>
    <v-card class="elevation-3">
    <v-card-title class="headline gradient">
      Calender  <span v-if="showMessage" class="updated-text">{{ message }}</span>
    </v-card-title>
    <div class="ma-4" style="height: 80vh; width: 150vh;">
      <v-calendar
        :events="events"
        event-color="light-blue"
      ></v-calendar>
    </div>
    </v-card>
    </v-container>
  </v-app>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'App',
    data: () => {
      return {
        urlinfo: 'http://127.0.0.1:8000/calenders/',
        message: 'Updated...',
        showMessage: false,
        events: [],
      };
    },

    created() {
      axios.get(this.urlinfo) // db에 저장된 캘린더 정보를 가져오기
      .then((response) => {
        this.events = response.data.map((data) => ({  // events 배열에 저장
          calenderId: data.calenderId,
          name: data.text,
          start: data.date,
      }));
      console.log(this.events)
      });
      
      this.$socket.on('liveCreateData', (data) => { // 실시간으로 데이터가 생성 됨
        this.events.push({  // events[]에 데이터 삽입
          calenderId: data.calenderId,
          name: data.text,
          start: data.date,
        });
        this.updatedMessage(10); // 10초동안 메시지 생성
      });
      
      this.$socket.on('liveDeleteData', (data) => { // 실시간으로 데이터가 삭제 됨
        console.log('clint events: ', this.events)                                              
        const indexToRemove = this.events.findIndex(event => event.calenderId === data.calenderId); // 삭제하려는 calenderId를 검색
        if (indexToRemove !== -1) {
          this.events.splice(indexToRemove, 1); // events[]의 원하는 데이터 삭제
        }
        console.log("client events index: ", indexToRemove)
        this.updatedMessage(10); // 10초동안 메시지 생성
      })
    },
    
    methods: {
      updatedMessage(time) {  // 일정시간 메시지를 나타내는 함수
        this.showMessage = true;
        setTimeout(() => {  // 10초 후에 메시지를 숨김
          this.showMessage = false;
        }, time * 1000);  // time 인자를 초 단위로 받도록 함
      }
    }
  };
</script>
<style scoped>
  v-container {
    margin-top: 20px;
  }

  v-card {
    max-width: 800px;
    margin: auto;
  }

  v-card-title {
    background-color: #1976D2;
    color: white;
  }

  .gradient {
    background-image: linear-gradient(to right, #12c2e9, #c471ed, #f64f59);
    color: white;
  }

  .updated-text {
    position: absolute;
    right: 20px;
    font-size: 20px;
    color: white;
  }
</style>