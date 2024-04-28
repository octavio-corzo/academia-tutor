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
            <a-card class="ml-3 mr-3 mb-3 mt-3" :bordered="false" hoverable @click="router.push('/quiz')">
                <div style="text-align: center;">
                    <LucideVueNext.BookText color="orange" :size="75" />
                    <a-typography-title :level="4" class="mt-2" style="text-align: center;">Quiz de
                        ubicación</a-typography-title>
                </div>

            </a-card>
        </a-col>
        <a-col class="gutter-row" :span="6">
            <a-card class="ml-3 mr-3 mb-3 mt-3" :bordered="false" hoverable @click="router.push('/assistant')">
                <div style="text-align: center;">
                    <LucideVueNext.Bot color="#612A6E" :size="75" />
                    <a-typography-title :level="4" class="mt-2" style="text-align: center;">Asistente
                        virtual</a-typography-title>
                </div>

            </a-card>
        </a-col>
        <a-col class="gutter-row" :span="6">
            <a-card class="ml-3 mr-3 mb-3 mt-3" :bordered="false" hoverable @click="router.push('/notes')">
                <div style="text-align: center;">
                    <LucideVueNext.Notebook color="green" :size="75" />
                    <a-typography-title :level="4" class="mt-2" style="text-align: center;">Notas</a-typography-title>
                </div>

            </a-card>
        </a-col>

    </a-row>
</template>

<script setup>
import * as LucideVueNext from 'lucide-vue-next';
import router from '../../router';

import { getMessaging, getToken } from "firebase/messaging";

const messaging = getMessaging();
// Add the public key generated from the console here.
getToken(messaging, { vapidKey: "BAnj2dy6Bpu7mD1AIkjE_GFsGYI3zstK389GJTduJ_cucRwYzvWkIp4VTtw9OTbktHHi5LMXIbbG7OA85_vMj9Y" });




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