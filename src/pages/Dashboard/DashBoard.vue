<template>
    <a-typography-title :level="3" class="text-center mb-2">Dashboard</a-typography-title>
    <a-divider></a-divider>
    <a-row :gutter="[16, 24]">
        <a-col class="gutter-row" :span="6">
            <a-card class="ml-3 mr-3 mb-3 mt-3" :bordered="false" hoverable @click="router.push('/doctors')">
                <div>
                    <LucideVueNext.Users color="#2A2E6E" />
                    <p class="mt-2" style="text-align: center;">XD</p>
                </div>

            </a-card>
        </a-col>
        <a-col class="gutter-row" :span="6">
            <a-card class="ml-3 mr-3 mb-3 mt-3" :bordered="false" hoverable @click="router.push('/cabins')">
                <div>
                    <LucideVueNext.Book color="orange" />
                    <p class="mt-2" style="text-align: center;">Libros</p>
                </div>

            </a-card>
        </a-col>
        <a-col class="gutter-row" :span="6">
            <a-card class="ml-3 mr-3 mb-3 mt-3" :bordered="false" hoverable @click="router.push('/entities')">
                <div>
                    <LucideVueNext.Bot color="#612A6E" />
                    <p class="mt-2" style="text-align: center;">Asistente virtual</p>
                </div>

            </a-card>
        </a-col>
        <a-col class="gutter-row" :span="6">
            <a-card class="ml-3 mr-3 mb-3 mt-3" :bordered="false" hoverable @click="router.push('/stats')">
                <div>
                    <LucideVueNext.BarChart color="green" />
                    <p class="mt-2" style="text-align: center;">XD</p>
                </div>

            </a-card>
        </a-col>

    </a-row>
</template>

<script setup>
import * as LucideVueNext from 'lucide-vue-next';
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