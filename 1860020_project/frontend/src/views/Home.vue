<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col>
          <v-carousel hide-delimiters cycle interval="5000"> <!-- 5초 간격으로 슬라이드 -->
            <v-carousel-item v-for="(image, index) in images" :key="index">
              <v-img :src="image.src"></v-img>
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      images: [
        { src: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzExMTNfMjMg%2FMDAxNjk5ODcwMTUzNjA1.oeUAfrqyjDAYWfWAU-g5aQ8-2nCzyA2g3kg3BAUItVYg.q0I1ITTwVDBKCF1LeglqM9D6Buh_Rd6kam1oJYkPRvog.PNG.fitnessmsm01%2Fimage_%252810%2529.png&type=sc960_832' },
        { src: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAyMDJfNjUg%2FMDAxNjc1MjczNTE5OTky.RW4cdey3IDcTuO5_D4b7bUqFsx5ZDJBSqRag3YadN4sg.9oRs8oWwsDbjcJ-mM8nrRJA3pkmEcrQKkzThza4A1ugg.JPEG.doanything09%2FSE-60a1ba0a-6845-45d3-8aee-caf6fbe4f7b7.jpg&type=sc960_832' },
        { src: 'https://thumb.mt.co.kr/06/2023/06/2023061408502186315_1.jpg/dims/optimize/' },
        { src: 'https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20230309_163%2F1678340573342KMSdh_JPEG%2FScreenshot_20230306_112313.jpg&type=sc960_832' },
      ],
    };
  },
};
</script>
