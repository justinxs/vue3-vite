<template>
    <router-view v-if="isInit"></router-view>
    <Host v-else/>
</template>

<script setup lang="ts">
import { userPlayerInit } from "@/stores/player";
import { toRefs } from "vue";
import { useHostStore } from "@/stores/host";
import Host from "@/Host.vue";

userPlayerInit();

const { isInit } = toRefs(useHostStore());
</script>
