<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <bottom-select />
</template>

<script>
import ButtonSelect from "@/components/ButtonSelect.vue";
export default {
  name: "App",
  components: {
    ButtonSelect,
  },
};
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}
</style>
