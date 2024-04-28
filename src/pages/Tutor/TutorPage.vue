<template>
    <div>
        <h2>Incorrect Topics:</h2>
        <ul>
            <li v-for="topic in incorrectTopics" :key="topic">{{ topic }}</li>
        </ul>
    </div>
</template>

<script setup>
const props = defineProps({
    incorrectTopics: Array,
});
</script>