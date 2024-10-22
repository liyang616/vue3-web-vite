<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Double Count: {{ doubleCount }}</p>
    <el-button type="primary" @click="increment">增加</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCounterStore } from '@/store/useCounterStore'

const counterStore = useCounterStore()

const count = ref(counterStore.$state.count)
const doubleCount = computed(() => counterStore.doubleCount)
const increment = () => counterStore.increment()
</script>
