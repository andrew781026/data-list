<template>
  <div></div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { useElementBounding } from "@/composables/useElementBounding.js";
import { useWindowSize } from "@/composables/useWindowSize.js";
import { useElementVisibility } from "@/composables/useElementVisibility.js";

export default {
  name: "MyaPopper",
  setup() {
    const el = ref(null);
    const popper = ref(null);
    const uuid = ref(_uuid());
    const open = ref(false);
    const { x, y, top, right, bottom, left } = useElementBounding(el);
    const { width, height } = useElementBounding(popper);
    const visible = useElementVisibility(el);
    const { height: windowHeight, width: windowWidth } = useWindowSize(el);

    onMounted(() => {
      document.body.appendChild(popper.value);
    });

    watch(visible, (val) => {
      if (!val) open.value = false;
    });

    return {
      uuid,
      visible,
      open,
      el,
      popper,
      x,
      y,
      top,
      right,
      bottom,
      left,
      width,
      height,
      windowHeight,
      windowWidth,
    };
  },
};
</script>

<style scoped>
.popper {
  position: fixed;
  background: #90c7ab;
  border: 1px solid #4ebe85;
  border-radius: 4px;
  padding: 8px;
}
</style>