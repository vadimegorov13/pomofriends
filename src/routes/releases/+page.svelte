<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import type { ReleaseNote } from '$data/releases/types';
  import Icon from '@iconify/svelte';
  import { format, parseISO } from 'date-fns';
  import { onMount } from 'svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let isVisible = $state(false);
  let releases = $derived(data.releases);
  let selectedRelease = $state<ReleaseNote | null>(null);

  $effect(() => {
    if (!selectedRelease) {
      selectedRelease = data.releases[0];
    }
  });

  onMount(() => {
    // Check if there's a slug in the URL
    const urlParams = new URLSearchParams(page.url.search);
    const slugParam = urlParams.get('slug');

    if (slugParam) {
      const release = data.releases.find((r) => r.slug === slugParam);
      if (release) {
        selectedRelease = release;
      } else {
        // If slug not found, redirect to first release
        goto(`/releases?slug=${data.releases[0].slug}`, { replaceState: true });
      }
    } else {
      // No slug in URL, set the first release and update URL
      goto(`/releases?slug=${data.releases[0].slug}`, { replaceState: true });
    }

    setTimeout(() => {
      isVisible = true;
    }, 100);
  });

  function selectRelease(release: ReleaseNote) {
    selectedRelease = release;
    // Update URL with slug without page reload
    const url = new URL(window.location.href);
    url.searchParams.set('slug', release.slug);
    window.history.replaceState({}, '', url);
  }
</script>

<div class="max-w-7xl mx-auto">
  <div
    class="mb-8 transition-all duration-700 {isVisible
      ? 'opacity-100 translate-y-0'
      : 'opacity-0 -translate-y-4'}"
  >
    <h1 class="text-4xl font-bold text-text mb-4">
      <span class="text-primary">Release</span>
      <span class="text-secondary">Notes</span>
    </h1>
    <p class="text-xl text-text-secondary">
      Track all the <span class="font-semibold text-primary">improvements</span>
      and
      <span class="font-semibold text-secondary">updates</span> we've made to
      <span class="font-semibold">
        <span class="text-primary">Pomo</span><span class="text-secondary"
          >Friends</span
        >
      </span>.
    </p>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
    <!-- Release List Sidebar -->
    <div
      class="lg:col-span-1 transition-all duration-700 delay-100 {isVisible
        ? 'opacity-100 translate-x-0'
        : 'opacity-0 -translate-x-8'}"
    >
      <div class="bg-surface border border-border rounded-xl p-4 shadow-lg">
        <h2 class="text-lg font-semibold text-text mb-4">All Releases</h2>
        <div class="space-y-2">
          {#each releases as release (release.id)}
            <button
              onclick={() => selectRelease(release)}
              class="w-full text-left p-3 rounded-lg transition-all group {selectedRelease?.id ===
              release.id
                ? 'bg-primary text-white'
                : 'hover:bg-bg-accent'}"
            >
              <div class="flex items-center justify-between">
                <span
                  class="font-semibold {selectedRelease?.id === release.id
                    ? 'text-white'
                    : 'text-text'}"
                >
                  v{release.version}
                </span>
                <Icon
                  icon="lucide:chevron-right"
                  width="16"
                  height="16"
                  class="transition-transform duration-300 {selectedRelease?.id ===
                  release.id
                    ? 'translate-x-1'
                    : 'group-hover:translate-x-1'}"
                />
              </div>
              <div>
                <div
                  class="font-medium {selectedRelease?.id === release.id
                    ? 'text-white'
                    : 'text-text'}"
                >
                  {release.shortTitle}
                </div>
              </div>
              <div
                class="text-xs {selectedRelease?.id === release.id
                  ? 'text-white/80'
                  : 'text-text-secondary'}"
              >
                {format(parseISO(release.date), 'MMMM d, yyyy')}
              </div>
            </button>
          {/each}
        </div>
      </div>
    </div>

    <!-- Release Details -->
    <div
      class="lg:col-span-3 transition-all duration-700 delay-200 {isVisible
        ? 'opacity-100 translate-x-0'
        : 'opacity-0 translate-x-8'}"
    >
      <div class="bg-surface border border-border rounded-xl p-8 shadow-lg">
        <!-- Header -->
        <div class="mb-8 pb-8 border-b border-border">
          <div class="flex items-center gap-3 mb-4">
            <div
              class="px-3 py-1 bg-primary text-white rounded-full text-sm font-semibold"
            >
              v{selectedRelease?.version}
            </div>
            <div class="text-sm text-text-secondary">
              {selectedRelease?.date
                ? format(parseISO(selectedRelease?.date), 'MMMM d, yyyy')
                : 'Unknown Date'}
            </div>
          </div>
          <h2 class="text-3xl font-bold text-text mb-4">
            {selectedRelease?.title}
          </h2>
          <div
            class="text-text-secondary text-lg leading-relaxed whitespace-pre-line"
          >
            {selectedRelease?.description}
          </div>
        </div>

        <!-- What's New -->
        {#if selectedRelease?.features && selectedRelease.features.length > 0}
          <div class="mb-10 pb-10 border-b border-border group">
            <div class="flex items-center gap-3 mb-6">
              <div
                class="p-2 bg-primary-100 rounded-lg transition-transform duration-300 group-hover:rotate-12"
              >
                <Icon
                  icon="lucide:sparkles"
                  width="24"
                  height="24"
                  class="text-primary"
                />
              </div>
              <h3 class="text-2xl font-semibold text-text">What's New</h3>
            </div>
            <ul class="space-y-4">
              {#each selectedRelease?.features as feature (feature.id)}
                <li class="group/item">
                  <div class="flex items-start gap-3 text-text-secondary">
                    <Icon
                      icon="lucide:check-circle"
                      width="20"
                      height="20"
                      class="text-primary mt-0.5 shrink-0 transition-transform duration-300 group-hover/item:scale-110"
                    />
                    <div class="flex-1">
                      <span class="font-semibold text-base text-text"
                        >{feature.title}</span
                      >
                      {#if feature.items && feature.items.length > 0}
                        <ul class="mt-3 ml-2 space-y-2">
                          {#each feature.items as item (item.id)}
                            <li
                              class="flex items-start gap-2 text-sm text-text-secondary group/subitem pl-4 border-l-2 border-primary/20"
                            >
                              <Icon
                                icon="lucide:arrow-right"
                                width="14"
                                height="14"
                                class="text-primary/60 mt-0.5 shrink-0 transition-transform duration-300 group-hover/subitem:translate-x-1"
                              />
                              <span class="leading-relaxed">{item.text}</span>
                            </li>
                          {/each}
                        </ul>
                      {/if}
                    </div>
                  </div>
                </li>
              {/each}
            </ul>
          </div>
        {/if}

        <!-- Improvements -->
        {#if selectedRelease?.improvements && selectedRelease.improvements.length > 0}
          <div class="mb-10 pb-10 border-b border-border group">
            <div class="flex items-center gap-3 mb-6">
              <div
                class="p-2 bg-secondary-100 rounded-lg transition-transform duration-300 group-hover:rotate-12"
              >
                <Icon
                  icon="lucide:trending-up"
                  width="24"
                  height="24"
                  class="text-secondary"
                />
              </div>
              <h3 class="text-2xl font-semibold text-text">Improvements</h3>
            </div>
            <ul class="space-y-4">
              {#each selectedRelease?.improvements as improvement (improvement.id)}
                <li class="group/item">
                  <div class="flex items-start gap-3 text-text-secondary">
                    <Icon
                      icon="lucide:check-circle"
                      width="20"
                      height="20"
                      class="text-secondary mt-0.5 shrink-0 transition-transform duration-300 group-hover/item:scale-110"
                    />
                    <div class="flex-1">
                      <span class="font-semibold text-base text-text"
                        >{improvement.title}</span
                      >
                      {#if improvement.items && improvement.items.length > 0}
                        <ul class="mt-3 ml-2 space-y-2">
                          {#each improvement.items as item (item.id)}
                            <li
                              class="flex items-start gap-2 text-sm text-text-secondary group/subitem pl-4 border-l-2 border-secondary/20"
                            >
                              <Icon
                                icon="lucide:arrow-right"
                                width="14"
                                height="14"
                                class="text-secondary/60 mt-0.5 shrink-0 transition-transform duration-300 group-hover/subitem:translate-x-1"
                              />
                              <span class="leading-relaxed">{item.text}</span>
                            </li>
                          {/each}
                        </ul>
                      {/if}
                    </div>
                  </div>
                </li>
              {/each}
            </ul>
          </div>
        {/if}

        <!-- Bug Fixes -->
        {#if selectedRelease?.bugFixes && selectedRelease.bugFixes.length > 0}
          <div class="group">
            <div class="flex items-center gap-3 mb-6">
              <div
                class="p-2 bg-accent-muted rounded-lg transition-transform duration-300 group-hover:rotate-12"
              >
                <Icon
                  icon="lucide:bug"
                  width="24"
                  height="24"
                  class="text-accent"
                />
              </div>
              <h3 class="text-2xl font-semibold text-text">Bug Fixes</h3>
            </div>
            <ul class="space-y-4">
              {#each selectedRelease?.bugFixes as bugFix (bugFix.id)}
                <li class="group/item">
                  <div class="flex items-start gap-3 text-text-secondary">
                    <Icon
                      icon="lucide:check-circle"
                      width="20"
                      height="20"
                      class="text-accent mt-0.5 shrink-0 transition-transform duration-300 group-hover/item:scale-110"
                    />
                    <div class="flex-1">
                      <span class="font-semibold text-base text-text"
                        >{bugFix.title}</span
                      >
                      {#if bugFix.items && bugFix.items.length > 0}
                        <ul class="mt-3 ml-2 space-y-2">
                          {#each bugFix.items as item (item.id)}
                            <li
                              class="flex items-start gap-2 text-sm text-text-secondary group/subitem pl-4 border-l-2 border-accent/20"
                            >
                              <Icon
                                icon="lucide:arrow-right"
                                width="14"
                                height="14"
                                class="text-accent/60 mt-0.5 shrink-0 transition-transform duration-300 group-hover/subitem:translate-x-1"
                              />
                              <span class="leading-relaxed">{item.text}</span>
                            </li>
                          {/each}
                        </ul>
                      {/if}
                    </div>
                  </div>
                </li>
              {/each}
            </ul>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
