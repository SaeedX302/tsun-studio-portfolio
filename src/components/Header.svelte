<script>
  import { createEventDispatcher } from 'svelte';
  // import { Wrench, UserCog } from 'lucide-svelte'; // Example icon import

  const dispatch = createEventDispatcher();

  function openChangelog() {
    dispatch('open-changelog');
  }

  function openAdmin() {
    dispatch('open-admin');
  }
</script>

<header class="fixed top-0 left-0 right-0 bg-black/30 backdrop-blur-lg z-40">
  <div class="container mx-auto px-6 py-4 flex justify-between items-center">
    <h1 class="text-xl font-bold text-white tracking-wider">
      TSun <span class="text-cyan-400">StudioPortfolio</span>
    </h1>
    <div class="flex items-center space-x-4">
      <button
        on:click={openChangelog}
        class="flex items-center space-x-2 text-sm font-semibold text-gray-300 hover:text-white bg-white/5 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/10"
      >
        <!-- <Wrench class="w-4 h-4" /> -->
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
        <span>Changelog</span>
      </button>
      <button
        on:click={openAdmin}
        class="flex items-center space-x-2 text-sm font-semibold text-gray-300 hover:text-white bg-white/5 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/10"
      >
        <!-- <UserCog class="w-4 h-4" /> -->
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 11.42a2 2 0 0 0-2.05-2.05c-.04-.24-.1-.48-.18-.71a2 2 0 0 0-3.6-1.15c-.23-.08-.47-.14-.71-.18a2 2 0 0 0-2.05-2.05c-.24.04-.48.1-.71.18a2 2 0 0 0-1.15 3.6c-.08.23-.14.47-.18.71a2 2 0 0 0 2.05 2.05c.24-.04.48-.1.71-.18a2 2 0 0 0 3.6 1.15c.23.08.47.14.71.18a2 2 0 0 0 2.05 2.05Z"/><circle cx="18" cy="18" r="3"/></svg>
        <span>Admin</span>
      </button>
    </div>
  </div>
</header>

<style>
  /*
 * =================================================================
 * STYLING OPTIONS
 * =================================================================
 * 1. Tailwind CSS (Default): Use the `class` directive.
 *
 * 2. SASS/SCSS (Scoped by default in Svelte):
 * - Add `svelte-preprocess` to your config.
 * - Write SASS directly in this <style> tag.
 * <style lang="scss">
 * .header { ... }
 * </style>
 *
 * 3. Global CSS:
 * - Use the :global() modifier in a style block.
 * :global(body) { ... }
 * =================================================================
 */
</style>
