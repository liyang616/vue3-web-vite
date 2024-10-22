<template>
  <div class="home">
    <h1>vite-web</h1>
    <Language />
    <el-date-picker type="datetime" placeholder="请选择" />
    <h1>{{ $t('home.Hot') }}</h1>
    <img alt="Vue logo" src="../assets/vue.svg" />
    <el-button type="primary">{{ weather }}</el-button>
    <el-button type="primary" :icon="Edit" />

    <p>---pinia简易示例start---</p>
    <Counter />
    <p>---pinia简易示例end---</p>

    <div class="block text-center">
      <el-carousel height="150px">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3 class="small justify-center" text="2xl">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Edit } from '@element-plus/icons-vue'
import { ref, getCurrentInstance } from 'vue'
const { proxy }: any = getCurrentInstance()
defineOptions({
  name: 'home'
})

let weather = ref<string>('')
proxy.$api.getData().then((res: any) => {
  if (res.status) return
  weather.value = res.data.weather
})
</script>

<style lang="scss" scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
