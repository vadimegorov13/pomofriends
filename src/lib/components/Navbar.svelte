<script lang="ts">
  import Icon from '@iconify/svelte';
  import { page } from '$app/state';
  import { onMount } from 'svelte';

  let userDropdownOpen = false;
  let isVisible = true;
  let lastScrollY = 0;
  let scrollThreshold = 100; // pixels to scroll before hiding navbar

  function toggleUserDropdown() {
    userDropdownOpen = !userDropdownOpen;
  }

  function closeDropdown() {
    userDropdownOpen = false;
  }

  function handleScroll() {
    const currentScrollY = window.scrollY;

    // Only hide if scrolled past threshold
    if (currentScrollY > scrollThreshold) {
      // Scrolling down
      if (currentScrollY > lastScrollY) {
        isVisible = false;
      }
      // Scrolling up
      else if (currentScrollY < lastScrollY) {
        isVisible = true;
      }
    } else {
      // Always show when near top
      isVisible = true;
    }

    lastScrollY = currentScrollY;
  }

  onMount(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<svelte:window on:click={closeDropdown} />

<nav
  class="bg-surface/40 backdrop-blur-md border-b border-border sticky top-0 z-50 transition-transform duration-300 shadow-sm {isVisible
    ? 'translate-y-0'
    : '-translate-y-full'}"
>
  <div class="max-w-7xl mx-auto px-8 flex justify-between items-center h-16">
    <div class="flex items-center gap-12">
      <a href="/" class="text-xl font-bold tracking-tight">
        <span class="text-primary">Pomo</span><span class="text-secondary"
          >Friends</span
        >
      </a>
      <div class="flex gap-8">
        <a
          href="/leaderboard"
          class="relative font-medium hover:text-secondary transition-colors {page
            .url.pathname === '/leaderboard'
            ? 'text-primary'
            : 'text-text'}"
        >
          <span>Leaderboard</span>
          {#if page.url.pathname === '/leaderboard'}
            <span
              class="absolute -bottom-4 left-0 right-0 h-0.5 bg-primary rounded-t"
            ></span>
          {/if}
        </a>
        <a
          href="/releases"
          class="relative font-medium hover:text-secondary transition-colors {page
            .url.pathname === '/releases'
            ? 'text-primary'
            : 'text-text'}"
        >
          <span>Releases</span>
          {#if page.url.pathname === '/releases'}
            <span
              class="absolute -bottom-4 left-0 right-0 h-0.5 bg-primary rounded-t"
            ></span>
          {/if}
        </a>
        <a
          href="/about"
          class="relative font-medium hover:text-secondary transition-colors {page
            .url.pathname === '/about'
            ? 'text-primary'
            : 'text-text'}"
        >
          <span>About</span>
          {#if page.url.pathname === '/about'}
            <span
              class="absolute -bottom-4 left-0 right-0 h-0.5 bg-primary rounded-t"
            ></span>
          {/if}
        </a>
      </div>
    </div>
    <div class="relative">
      <button
        class="bg-bg-muted hover:bg-bg-accent border border-border rounded-xl w-11 h-11 flex items-center justify-center text-text-secondary transition-all"
        on:click|stopPropagation={toggleUserDropdown}
        aria-label="User menu"
      >
        <Icon icon="mdi:account-circle" width="24" height="24" />
      </button>
      <div
        class="absolute top-full right-0 mt-2 bg-surface-elevated border border-border rounded-xl min-w-[180px] shadow-2xl transition-all duration-200 {userDropdownOpen
          ? 'opacity-100 visible translate-y-0'
          : 'opacity-0 invisible -translate-y-2'}"
      >
        <a
          href="/profile"
          class="block px-4 py-3 text-text-secondary hover:bg-bg-accent hover:text-text transition-all first:rounded-t-xl"
        >
          Profile
        </a>
        <a
          href="/stats"
          class="block px-4 py-3 text-text-secondary hover:bg-bg-accent hover:text-text transition-all"
        >
          Stats
        </a>
        <a
          href="/settings"
          class="block px-4 py-3 text-text-secondary hover:bg-bg-accent hover:text-text transition-all"
        >
          Settings
        </a>
        <div class="h-px bg-border my-2"></div>
        <a
          href="/logout"
          class="block px-4 py-3 text-secondary hover:bg-bg-accent hover:text-secondary-hover transition-all last:rounded-b-xl"
        >
          Logout
        </a>
      </div>
    </div>
  </div>
</nav>
