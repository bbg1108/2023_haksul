<template>
    <v-app>
        <v-app-bar app dark class="gradient">
            <v-app-bar-nav-icon @click.stop="bDrawer=!bDrawer"></v-app-bar-nav-icon>
            <v-toolbar-title>편의시설 위치정보 조회</v-toolbar-title>
            <v-spacer></v-spacer>
            <div v-if="!isLoggedIn">
            <router-link to="/login">
              <v-btn class="pink">로그인</v-btn>
            </router-link> &nbsp;</div>
            <div v-else><v-btn class="pink" @click="logout">로그아웃</v-btn></div>
        </v-app-bar>
        <v-navigation-drawer absolute temporary v-model="bDrawer">
            <v-toolbar flat height="100px" class="gradient" dark :elevation="6">
                <v-list>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-avatar>
                                <img src="http://randomuser.me/api/portraits/men/44.jpg">
                            </v-list-item-avatar>
                            <v-list-item-title class="title">사용자</v-list-item-title>
                            <v-list-item-subtitle></v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-toolbar>
            <v-divider></v-divider>
            <v-list class="pt-3">
                <v-list-item v-for="item in items" :key="item.text" :href="item.to">
                    <v-list-item-action>
                        <v-icon>{{item.icon}}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>{{item.text}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-main>
            <router-view></router-view>
        </v-main>
        <v-footer class="gradient" dark>
      <v-row justify="center" class="my-4 text-center">
        <v-col cols="12"
          >Lorem ipsum dolor sit amet consectetur
          adipisicing elit.
        </v-col>
        <v-col cols="12">
          <v-btn v-for="icon in icons" :key="icon" text dark>
            <v-icon>{{ icon }}</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12" class="align-center">&copy; 
            2023 Coding Beauty
        </v-col>
      </v-row>
    </v-footer>
    </v-app>
</template>

<script>
import axios from 'axios';
export default {
  name: 'App',
  data() {     
      return {
      urlinfo:'http://127.0.0.1:8000/logout',
      bDrawer: false,
      isLoggedIn: false,
      items: [
        { text: '조회하기', icon: 'mdi-magnify-expand' , to:'/find'},
        { text: 'Home', icon: 'mdi-home', to:'/home' },
        { text: '스케줄', icon: 'mdi-calendar', to:'/schedule' },
      ],
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-instagram',
        'mdi-youtube',
      ],
    }
  },
  created(){
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // 로컬 스토리지
    this.$bus.$on('loginData', () => {
      this.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', 'true');
    });
  },
  methods: {
    logout() {  // 로그아웃을 하는 함수
      axios.get(this.urlinfo)
      .then(response => {
          if (response.status === 200) {
            this.isLoggedIn = false;
            localStorage.setItem('isLoggedIn', 'false');
            this.$router.push('/login');  // '/login' 경로로 이동하도록 수정합니다.
            alert('로그아웃 되었습니다.');
          }
      })
      .catch(error => {
          console.error(error);
      });
    },

  },
};
</script>
<style scoped>
a {text-decoration:none; color:white;}
.gradient {
  background-image: radial-gradient( circle farthest-corner at 14.7% 26.3%,  rgba(121,206,212,1) 0.2%, rgba(101,167,191,1) 89.5% );
  border: none;
  color: white;
}
</style>
