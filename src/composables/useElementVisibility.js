import { onMounted, ref } from "vue";

/**
 * Tracks the visibility of an element within the viewport.
 *
 * @see https://vueuse.org/useElementVisibility
 * @param element
 * @param options
 */
export function useElementVisibility(
  element,
  options = { threshold: 1 },
) {

  const elementIsVisible = ref(false);
  onMounted(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => elementIsVisible.value = entry.isIntersecting);
    }, options);

    intersectionObserver.observe(element.value);
  });

  return elementIsVisible;
}
