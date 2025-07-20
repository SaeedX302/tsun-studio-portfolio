<!-- src/components/Header.vue -->

<template>
  <header class="fixed top-0 left-0 right-0 bg-black/30 backdrop-blur-lg z-40">
    <div class="container mx-auto px-6 py-4 flex justify-between items-center">
      <h1 class="text-xl font-bold text-white tracking-wider">
        TSun <span class="text-cyan-400">StudioPortfolio</span>
      </h1>
      <div class="flex items-center space-x-4">
        <button
          @click="$emit('open-changelog')"
          class="flex items-center space-x-2 text-sm font-semibold text-gray-300 hover:text-white bg-white/5 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/10"
        >
          <!-- In Vue, you'd use a library like `vue-lucide` or SVG icons directly -->
          <WrenchIcon class="w-4 h-4" />
          <span>Changelog</span>
        </button>
        <button
          @click="$emit('open-admin')"
          class="flex items-center space-x-2 text-sm font-semibold text-gray-300 hover:text-white bg-white/5 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/10"
        >
          <UserCogIcon class="w-4 h-4" />
          <span>Admin</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
// For Vue 2/3 with Options API. For Composition API, use <script setup>.
// import { WrenchIcon, UserCogIcon } from 'vue-lucide'; // Example icon import

export default {
  name: 'Header',
  components: {
    // WrenchIcon,
    // UserCogIcon
  },
  // Props and emits would be defined here for event handling
};
</script>

<!--
/*
 * =================================================================
 * STYLING OPTIONS
 * =================================================================
 * 1. Tailwind CSS (Default): Classes are in the <template>.
 *
 * 2. SASS/SCSS (Scoped):
 * <style lang="scss" scoped>
 * .header { ... }
 * </style>
 *
 * 3. CSS Modules:
 * <style module>
 * .header { ... }
 * </style>
 * Then use in template: :class="$style.header"
 * =================================================================
 */
-->
