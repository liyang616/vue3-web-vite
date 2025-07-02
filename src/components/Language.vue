<template>
  <el-dropdown placement="bottom" trigger="click">
    <div class="language">
      <!-- <img src="@/assets/language.png" alt="" /> -->
      <span>{{ localeText }}</span>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item in languageList" @click="languageClick(item)">{{ item.name }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'
const { proxy }: any = getCurrentInstance()
const route = useRoute()

// i18n语言切换
import { languageList } from '@/i18n/language'
import { useI18n } from 'vue-i18n'
const localeText = ref<string>('')
const { locale, t: $t } = useI18n()

localeText.value = languageList[localStorage.getItem('language') || 'en-US'].name
locale.value = languageList[localStorage.getItem('language') || 'en-US'].value
proxy.$language.value = languageList[localStorage.getItem('language') || 'en-US'].value

const emit = defineEmits(['change'])
const languageClick = (item: any) => {
  if (locale.value == languageList[item.value].value) return
  localeText.value = item.name
  locale.value = languageList[item.value].value
  localStorage.setItem('language', locale.value)
  document.title = $t(route.meta.i18nKey as string)
  proxy.$language.value = locale.value
  emit('change', locale.value)
}
</script>

<style lang="scss" scoped>
.language {
  display: flex;
  align-items: center;
  margin-left: 32px;
  &::after {
    content: ' ';
    position: absolute;
    left: 0;
    top: -6px;
    height: 36px;
    width: 1px;
    background: rgba(255, 255, 255, 0.2);
  }
  img {
    margin-right: 6px;
  }
  span {
    font-size: 14px;
  }
}
</style>
