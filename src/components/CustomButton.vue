<script setup lang="ts">
  // An old reusable component that helps create custom buttons.

  import { computed, defineProps } from 'vue';

  const props = withDefaults(
    defineProps<{
      type?: string;
      text?: string;
    }>(),
    {
      type: 'primary',
      text: 'Custom Button',
    },
  );
  const buttonClass = computed(() => {
    switch (props.type) {
      case 'primary':
        return 'rounded px-3 py-2 text-white bg-green-500 hover:bg-green-600 transition-colors duration-150';
      case 'secondary':
        return 'px-6 py-2 font-semibold text-white bg-gray-500 rounded-md hover:opacity-95 focus:outline-none';
      case 'soft-blue':
        return 'soft-blue';
      case 'gradient':
        return 'gradient-button';
      case 'outline':
        return 'outline-button';
      case 'rounded':
        return 'rounded-button';
      default:
        return '';
    }
  });
</script>

<template>
  <button
    class="flex items-center justify-center"
    :class="buttonClass"
  >
    {{ text }}
  </button>
</template>

<style>
  .soft-blue {
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .soft-blue:hover {
    background-color: #0056b3;
  }
  .gradient-button {
    background: linear-gradient(to right, #007bff, #6610f2);
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-position 0.3s ease;
    background-size: 200% 100%;
    background-position: right bottom;
  }

  .gradient-button:hover {
    background-position: left bottom;
  }
  .outline-button {
    background-color: transparent;
    color: #007bff;
    border: 2px solid #007bff;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition:
      background-color 0.3s ease,
      color 0.3s ease;
  }

  .outline-button:hover {
    background-color: #007bff;
    color: #fff;
  }
  .rounded-button {
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 25px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: box-shadow 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .rounded-button:hover {
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
  }
</style>
