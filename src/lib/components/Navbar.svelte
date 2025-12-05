<script lang="ts">
  import Icon from '@iconify/svelte';
  import { page } from '$app/stores';

  let userDropdownOpen = false;

  function toggleUserDropdown() {
    userDropdownOpen = !userDropdownOpen;
  }

  function closeDropdown() {
    userDropdownOpen = false;
  }

  $: currentPath = $page.url.pathname;
</script>

<svelte:window on:click={closeDropdown} />

<nav class="bg-surface border-b border-border sticky top-0 z-50">
  <div class="max-w-7xl mx-auto px-8 flex justify-between items-center h-16">
    <div class="flex items-center gap-12">
      <a
        href="/"
        class="text-xl font-bold text-text tracking-tight hover:text-primary transition-colors"
      >
        PomoFriends
      </a>
      <div class="flex gap-8">
        <a
          href="/"
          class="relative font-medium hover:text-primary transition-colors {currentPath ===
          '/'
            ? 'text-text'
            : 'text-text-secondary'}"
        >
          <span>Home</span>
          {#if currentPath === '/'}
            <span
              class="absolute -bottom-4 left-0 right-0 h-0.5 bg-primary rounded-t"
            ></span>
          {/if}
        </a>
        <a
          href="/leaderboard"
          class="relative font-medium hover:text-primary transition-colors {currentPath ===
          '/leaderboard'
            ? 'text-text'
            : 'text-text-secondary'}"
        >
          <span>Leaderboard</span>
          {#if currentPath === '/leaderboard'}
            <span
              class="absolute -bottom-4 left-0 right-0 h-0.5 bg-primary rounded-t"
            ></span>
          {/if}
        </a>
        <a
          href="/about"
          class="relative font-medium hover:text-primary transition-colors {currentPath ===
          '/about'
            ? 'text-text'
            : 'text-text-secondary'}"
        >
          <span>About</span>
          {#if currentPath === '/about'}
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
