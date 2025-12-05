<script lang="ts">
  import './layout.css';
  import favicon from '$lib/assets/favicon.svg';
  import Navbar from '$lib/components/Navbar.svelte';

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen bg-bg-main">
  <Navbar />
  <main class="max-w-7xl mx-auto px-8 py-8">
    {@render children()}
  </main>
</div>
