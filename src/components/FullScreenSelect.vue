<template>
  <div>
    <ul v-for="item in list" :key="item.uuid">
      <li>{{ item.text }}</li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";

export default {
  name: "FullScreenSelect",
  setup(props) {
    return { list: props.list };
  },
};
</script>

<style scoped>
</style>