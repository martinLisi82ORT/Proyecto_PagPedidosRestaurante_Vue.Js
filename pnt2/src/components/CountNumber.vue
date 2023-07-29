<template>
    <div class="count">
        <!--{{ count }}-->
        {{ storeAuth.count }}
    </div>
    <div class = "buttons">
            <button @click = "storeAuth.decreaseCount">-</button>
            <button @click = "storeAuth.increaseCount">+</button>
        </div>
</template>

<script setup> //<script setup lang="ts">
import { useAuthStore } from '@/AuthStore';
const storeAuth = useAuthStore()
</script>

<style scoped>
.count {
    font-size: 60px;
    margin: 20px;
}
.buttons {
    font-size: 60px;
    margin: 20px;
}
</style>