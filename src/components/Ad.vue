<template>
  <div class="ad-container" v-if="showAd">
    <div class="ad-content">
      <img :src="adImage" alt="Advertisement" />
      <div class="timer">{{ timer }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Props
const props = defineProps({
  adImage: {
    type: String,
    default: '', // 默认广告图片地址
  },
});

// State
const timer = ref(9);
const showAd = ref(true);

// Methods
const startTimer = () => {
  const interval = setInterval(() => {
    if (timer.value > 0) {
      timer.value -= 1;
    } else {
      clearInterval(interval);
      closeAd();
    }
  }, 1000);
};

const closeAd = () => {
  showAd.value = false;
  // Emit close event to parent component
  emit('close');
};

// Lifecycle
onMounted(() => {
  startTimer();
});
</script>

<style scoped>
.ad-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.ad-content {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.ad-content img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.timer {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
}
</style>