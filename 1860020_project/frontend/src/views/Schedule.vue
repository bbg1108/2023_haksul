<template>
  <v-container fluid>
    <div>
    <v-row justify="center">
      <calender/>
    </v-row>
    </div>
  </v-container>
</template>

<script>
import Calender from '../components/Calender2';

export default {
  name: 'board',
  components: {
    Calender
  },
  data: () => ({
    //
  }),
}
</script>
