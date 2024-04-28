<template>
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
        <div class="logo" />
        <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">

        </a-menu>
    </a-layout-sider>
</template>

<script setup>
import * as LucideVueNext from 'lucide-vue-next';
import { useRouter } from "vue-router";
import { ref } from 'vue';

const collapsed = ref(false);
const selectedKeys = ref(['1']);
const router = useRouter();


function navigateTo(route) {
    router.push(route);
}
</script>
