<template>
  <div class="flex items-center justify-between drag h-14">
    <div class="flex items-center pl-5">
      <IconPark :icon="Left" :size="iconSize" :stroke-width="2" class="icon-button" @click="router.back()"/>
      <IconPark :icon="Right" :size="iconSize" :stroke-width="2" class="icon-button"/>
      <div class="search no-drag ml-2">
        <SearchPop/>
      </div>
    </div>
    <div class="flex items-center mr-5">
      <UserInfo class="mr-2"/>
      <IconPark :icon="Mail" :stroke-width="2" class="icon-button"/>
      <IconPark :icon="Platte" :stroke-width="2" class="icon-button" @click="changeThemeMode"/>
      <IconPark :icon="HamburgerButton" :stroke-width="2" class="icon-button"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { HamburgerButton, Left, Mail, Platte, Right, Search } from '@icon-park/vue-next';
import { useRouter } from "vue-router";
import IconPark from "@/components/common/IconPark.vue";
import UserInfo from "@/components/layout/header/UserInfo.vue";
import { useSearchStore } from "@/store/search";
import { storeToRefs } from "pinia";
import SearchPop from "@/components/layout/header/SearchPop.vue";
import { ref } from "vue";

const iconSize = 22;
const router = useRouter();
const { showSearchView, searchKeyword } = storeToRefs(useSearchStore());
const themeList = ['dark', 'light'];
const theme = ref('');
const currentTheme = () => {
    const classList = document.documentElement.classList;
    for (let i = 0; i < themeList.length; i++) {
        if (classList.contains(themeList[i])) {
            return themeList[i];
        }
    }
    return 'light';
};
const randomTheme = (last?: string) => {
    let lastIndex, lessList = themeList.slice(0);
    for (let i = 0; i < themeList.length; i++) {
        if (last === themeList[i]) {
            lastIndex = i;
            break;
        }
    }
    lastIndex !== undefined && lessList.splice(lastIndex, 1);

    return lessList[Math.floor(lessList.length * Math.random())];
}
const changeThemeMode = () => {
    let lastTheme = currentTheme();
    let name = randomTheme(lastTheme);
    if (name !== lastTheme) {
        document.documentElement.classList.remove(lastTheme);
        theme.value = name;
        document.documentElement.classList.add(name);
    }
}

</script>
<style lang="scss" scoped>
.search {
  @apply text-xs;
  :deep(.el-input__inner) {
    @apply rounded-full text-xs bg-slate-100 dark:bg-stone-900;
  }
}

.icon-button {
  @apply p-2 cursor-pointer;
  @apply hover:text-emerald-400 ;
}
</style>
