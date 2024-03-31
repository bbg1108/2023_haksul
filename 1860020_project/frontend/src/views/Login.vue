<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="5">
        <v-card class="mt-10">
          <v-card-title class="text-h5">로그인</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="loginSubmit">
              <v-text-field v-model="userId" label="아이디" required></v-text-field>
              <v-text-field v-model="userPassword" label="비밀번호" type="password" required></v-text-field>
                <v-btn type="submit" class="btn_gradient mt-3">로그인</v-btn>
                <subscribe/>              
            </v-form>
          </v-card-text>            
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import axios from 'axios';
import qs from 'qs';
import Subscribe from './Subscribe.vue';

export default {
  components: {
    Subscribe
  },
  data() {
    return {
      urlinfo: 'http://127.0.0.1:8000/login',
      userId: null,
      userPassword: null,
    };
  },
  methods: {
    loginSubmit() {
      let saveData = {};
      saveData.username = this.userId;
      saveData.password = this.userPassword;

      try {
        axios
          .post(this.urlinfo, qs.stringify(saveData), {
            headers: {
              'Content-Type': `application/x-www-form-urlencoded`,
            },
            withCredentials: true,
          })
          .then((res) => {
            if (res.status === 200) {
              if (res.data.code === 0) {
                alert('로그인 실패');
              } else if (res.data.code === 2) {
                alert('접근제한 페이지');
              } else if (res.data.code === 1) {
                alert('로그인 성공');
                this.$bus.$emit('loginData');
                this.$router.push('/home');
              }
            } else if (res.status === 401) {
              alert(res.data.message);
            }
          });
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.btn_gradient {
  background-image: linear-gradient(-225deg, #22E1FF 0%, #1D8FE1 48%, #625EB1 100%);
  border: none;
  color: white;
  width: 100%;
 }
</style>
