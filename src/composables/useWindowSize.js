import { onMounted, ref } from "vue";

/**
 * Reactive window size.
 *
 * @see https://vueuse.org/useWindowSize
 * @param options
 */
export function useWindowSize(options = {}) {
  const {
    initialWidth = Infinity,
    initialHeight = Infinity,
    listenOrientation = true,
    includeScrollbar = true,
  } = options;

  const width = ref(initialWidth);
  const height = ref(initialHeight);

  const update = () => {
    if (!window) return;

    if (includeScrollbar) {
      width.value = window.innerWidth;
      height.value = window.innerHeight;
    } else {
      width.value = window.document.documentElement.clientWidth;
      height.value = window.document.documentElement.clientHeight;
    }
  };

  onMounted(update);
  window.addEventListener("resize", update, { passive: true });

  if (listenOrientation)
    window.addEventListener("orientationchange", update, { passive: true });

  return { width, height };
}
