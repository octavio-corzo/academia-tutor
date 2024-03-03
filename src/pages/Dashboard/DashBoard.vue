<template>
    <a-typography-title class="text-center mb-2">Dashboard</a-typography-title>
    <a-divider></a-divider>
    <a-row :gutter="[16, 24]">
        <a-col class="gutter-row" :span="6">
            <a-card class="ml-3 mr-3 mb-3 mt-3" :bordered="false" hoverable @click="router.push('/profile')">
                <div style="text-align: center;">
                    <LucideVueNext.User color="#2A2E6E" :size="75" />
                    <a-typography-title :level="4" class="mt-2" style="text-align: center;">Mi
                        Perfil</a-typography-title>
                </div>

            </a-card>
        </a-col>
        <a-col class="gutter-row" :span="6">
            <a-card class="ml-3 mr-3 mb-3 mt-3" :bordered="false" hoverable @click="router.push('/dashboard')">
                <div style="text-align: center;">
                    <LucideVueNext.Book color="orange" :size="75" />
                    <a-typography-title :level="4" class="mt-2" style="text-align: center;">Libros</a-typography-title>
                </div>

            </a-card>
        </a-col>
        <a-col class="gutter-row" :span="6">
            <a-card class="ml-3 mr-3 mb-3 mt-3" :bordered="false" hoverable @click="router.push('/entities')">
                <div style="text-align: center;">
                    <LucideVueNext.Bot color="#612A6E" :size="75" />
                    <a-typography-title :level="4" class="mt-2" style="text-align: center;">Asistente
                        virtual</a-typography-title>
                </div>

            </a-card>
        </a-col>
        <a-col class="gutter-row" :span="6">
            <a-card class="ml-3 mr-3 mb-3 mt-3" :bordered="false" hoverable @click="router.push('/login')">
                <div style="text-align: center;">
                    <LucideVueNext.Rss color="green" :size="75" />
                    <a-typography-title :level="4" class="mt-2"
                        style="text-align: center;">Novedades</a-typography-title>
                </div>

            </a-card>
        </a-col>

    </a-row>
</template>

<script setup>
import * as LucideVueNext from 'lucide-vue-next';
import router from '../../router';
</script>

<style>
#dashboard .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#dashboard .logo {
    width: 120px;
    height: 31px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px 24px 16px 0;
    float: left;
}
</style>