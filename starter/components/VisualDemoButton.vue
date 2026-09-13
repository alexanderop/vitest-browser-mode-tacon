<script setup lang="ts">
withDefaults(defineProps<{
  variant: 'primary' | 'secondary' | 'outline'
  size: 'small' | 'medium' | 'large'
  disabled?: boolean
}>(), { disabled: false })
</script>

<template>
  <button class="demo-button" :class="[variant, size]" :disabled="disabled">
    <slot>In den Warenkorb</slot>
  </button>
</template>

<style scoped>
.demo-button { display: inline-flex; align-items: center; justify-content: center; border: 2px solid transparent; border-radius: 7px; font-family: inherit; font-weight: 650; white-space: nowrap; line-height: 1.2; }
.primary { background: #ad4325; color: #fff; }
.secondary { background: #f5dfbf; color: #51311e; }
.outline { background: transparent; border-color: #ad4325; color: #983819; outline: none; }
.small { padding: 6px 10px; font-size: 11px; }
.medium { padding: 9px 13px; font-size: 12px; }
.large { padding: 12px 16px; font-size: 13px; }
.demo-button:disabled { opacity: .4; }
</style>
