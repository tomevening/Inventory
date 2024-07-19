import {
  onMounted,
  onUnmounted,
  ref,
  shallowReactive,
  shallowReadonly,
  shallowRef,
} from 'vue';

export function useTooltip() {
  const isTooltipVisible = shallowRef(false);
  const tooltipPosition = shallowReactive({ x: 0, y: 0 });
  const tooltipRef = ref<HTMLElement | null>(null);

  function updateTooltipPosition(e: MouseEvent) {
    const rect = tooltipRef.value?.getBoundingClientRect();
    if (rect) {
      tooltipPosition.x = e.clientX - rect.left;
      tooltipPosition.y = e.clientY - rect.top;
    }
  }

  function showTooltip() {
    isTooltipVisible.value = true;
  }

  function hideTooltip() {
    isTooltipVisible.value = false;
  }

  onMounted(() => {
    const el = tooltipRef.value;
    if (!el) return;
    el.addEventListener('mouseenter', showTooltip);
    el.addEventListener('mouseleave', hideTooltip);
    el.addEventListener('mousemove', updateTooltipPosition);
  });

  onUnmounted(() => {
    const el = tooltipRef.value;
    if (!el) return;
    el.removeEventListener('mouseenter', showTooltip);
    el.removeEventListener('mouseleave', hideTooltip);
    el.removeEventListener('mousemove', updateTooltipPosition);
  });

  return shallowReadonly({
    isTooltipVisible,
    tooltipPosition,
    tooltipRef,
  });
}
