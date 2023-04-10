import { ref, onMounted, watch } from "vue";

/**
 * Reactive bounding box of an HTML element.
 *
 * @see https://vueuse.org/useElementBounding
 * @param target
 */
export function useElementBounding(
  target,
  options = {},
) {
  const {
    reset = true,
    windowResize = true,
    windowScroll = true,
    immediate = true,
  } = options;

  const height = ref(0);
  const bottom = ref(0);
  const left = ref(0);
  const right = ref(0);
  const top = ref(0);
  const width = ref(0);
  const x = ref(0);
  const y = ref(0);

  function update() {
    const el = ref(target);

    if (!el.value) {
      if (reset) {
        height.value = 0;
        bottom.value = 0;
        left.value = 0;
        right.value = 0;
        top.value = 0;
        width.value = 0;
        x.value = 0;
        y.value = 0;
      }
      return;
    }

    const rect = el.value.getBoundingClientRect();

    height.value = rect.height;
    bottom.value = rect.bottom;
    left.value = rect.left;
    right.value = rect.right;
    top.value = rect.top;
    width.value = rect.width;
    x.value = rect.x;
    y.value = rect.y;
  }

  watch(() => ref(target), ele => !ele && update());

  if (windowScroll) window.addEventListener("scroll", update, { capture: true, passive: true });
  if (windowResize) window.addEventListener("resize", update, { passive: true });

  onMounted(() => {
    if (immediate) update();

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(target.value);
  });

  return {
    height,
    bottom,
    left,
    right,
    top,
    width,
    x,
    y,
    update,
  };
}
