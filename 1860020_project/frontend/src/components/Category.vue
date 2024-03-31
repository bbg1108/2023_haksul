<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-card class="pa-4" outlined>
          <p>Options</p>
          <v-btn-toggle color="deep-purple darken-2">
            <v-btn v-for="cat in category" :key="cat.code" @click="sendCategory(cat.code)">
              {{ cat.name }}
            </v-btn>
          </v-btn-toggle>
          <v-radio-group @change="sendRadius">
            <v-row>
              <v-col v-for="(option, index) in radiusOptions" :key="index">
                <v-radio :label="option.label" :value="option.value"></v-radio>
              </v-col>
            </v-row>
          </v-radio-group>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'storecount',
  data() {
    return {
      category: [
        { code: "MT1", name: "대형마트" },
        { code: "CS2", name: "편의점" },
        { code: "FD6", name: "음식점" },
        { code: "CE7", name: "카페" },
        { code: "PK6", name: "주차장" },
        { code: "CT1", name: "문화시설" }
      ],
      radiusOptions: [
        { label: '1km', value: 1000 },
        { label: '3km', value: 3000 },
        { label: '5km', value: 5000 },
      ],
    };
  },
  methods: {
    sendCategory(data) {  // 카테고리 코드를 전달
      console.log('Button clicked with data:', data);
      this.$bus.$emit('categoryCode', data);
    },
    sendRadius(data) {    // 반경 거리를 전달
      console.log('Radius changed to:', data);
      this.$bus.$emit('sendRadius', data);
    }
  },
};
</script>

<style scoped>
.count1 {
  text-align: center;
  font-size: 30pt;
  font-weight: 300;
  color: black;
}
</style>
