import { ref, watch, computed, onMounted } from "vue";
import { useElementBounding } from "./useElementBounding";
import { useElementVisibility } from "./useElementVisibility";
import { useWindowSize } from "./useWindowSize";
import { _uuid } from "@/utils/uuid";

export const usePopper = ({ reference, placements = "bottom" }) => {
  const el = ref(null);
  const popper = ref(null);
  const uuid = ref(_uuid());
  const open = ref(false);
  const { x, y, top, right, bottom, left } = useElementBounding(el);
  const { width, height } = useElementBounding(popper);
  const visible = useElementVisibility(el);
  const { height: windowHeight, width: windowWidth } = useWindowSize(el);

  onMounted(() => {
    el.value = ref(reference);

    document.body.appendChild(popper.value);
  });

  watch(visible, (val) => {
    if (!val) open.value = false;
  });

  const show = computed(() => visible.value && open.value);

  const position = computed(() => {
    const style = {};

    /* placements = [ 
         top-start , top , top-end , 
         left-start , left , left-end , 
         right-start , right , right-end ,
         bottom-start , bottom , bottom-end 
      ]
    */
    // 需要配合 placements 設定的上下左右來算出數值
    if (this.height + this.bottom > this.windowHeight) {
      style.bottom = this.windowHeight - this.top + "px";
    } else {
      style.top = this.bottom + "px";
    }

    style.left = (this.left + this.right) / 2 - this.width / 2 + "px";

    // 設定的 offset
    style.margin = "10px";

    return style;
  });

  return {
    position,
    show,
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
    windowWidth
  };
};
