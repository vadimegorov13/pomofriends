<script lang="ts">
  import { page } from '$app/state';
  import Icon from '@iconify/svelte';
  import { onMount } from 'svelte';

  let isVisible = $state(false);

  onMount(() => {
    setTimeout(() => {
      isVisible = true;
    }, 100);
  });

  const error = $derived(page.error);
  const status = $derived(page.status);
</script>

<div class=" bg-main flex items-center justify-center px-4 py-16">
  <div
    class="w-full max-w-4xl text-center transition-all duration-700 {isVisible
      ? 'opacity-100 translate-y-0'
      : 'opacity-0 translate-y-8'}"
  >
    <!-- Giant 404 with emoji -->
    <div class="relative mb-4">
      <span
        class="text-9xl sm:text-[8rem] lg:text-[12rem] font-black bg-linear-to-r from-primary via-secondary to-primary bg-clip-text text-transparent leading-none"
        style="font-size: clamp(6rem, 20vw, 12rem);"
      >
        {status || 404}
      </span>
    </div>

    <!-- Error message -->
    <h2 class="text-4xl font-bold text-text mb-4 slide-in-1">Oops!</h2>

    <p class="text-lg text-text/70 mb-8 max-w-md mx-auto slide-in-2">
      {error?.message ||
        "Looks like this page took a break... or maybe it never existed. Either way, it's not here!"}
    </p>

    <!-- Animated decorative dots -->
    <div class="flex justify-center gap-3 mb-12 slide-in-3">
      <div class="dot-bounce" style="animation-delay: 0ms"></div>
      <div class="dot-bounce" style="animation-delay: 150ms"></div>
      <div class="dot-bounce" style="animation-delay: 300ms"></div>
    </div>

    <!-- Call to action buttons -->
    <div
      class="flex flex-col sm:flex-row gap-4 justify-center items-center slide-in-4"
    >
      <a
        href="/"
        class="px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group flex items-center gap-2"
      >
        <Icon
          icon="lucide:home"
          width="20"
          height="20"
          class="transition-transform duration-300 group-hover:rotate-12"
        />
        Go Back Home
      </a>

      <button
        onclick={() => window.history.back()}
        class="px-8 py-3 bg-surface border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group flex items-center gap-2"
      >
        <Icon
          icon="lucide:arrow-left"
          width="20"
          height="20"
          class="transition-transform duration-300 group-hover:-translate-x-1"
        />
        Go Back
      </button>
    </div>

    <!-- Fun message with spinning timer icons -->
    <div
      class="mt-12 flex items-center justify-center gap-3 text-text/60 slide-in-5"
    >
      <Icon icon="lucide:timer" width="24" height="24" class="spin-slow" />
      <p class="text-sm">Maybe try finding what you need from the homepage?</p>
      <Icon
        icon="lucide:timer"
        width="24"
        height="24"
        class="spin-slow-reverse"
      />
    </div>
  </div>
</div>

<style>
  .dot-bounce {
    width: 12px;
    height: 12px;
    background: var(--color-primary);
    border-radius: 50%;
    animation: bounce-dot 1.5s ease-in-out infinite;
  }

  .slide-in-1 {
    animation: slideIn 0.6s ease-out 0.2s both;
  }

  .slide-in-2 {
    animation: slideIn 0.6s ease-out 0.3s both;
  }

  .slide-in-3 {
    animation: slideIn 0.6s ease-out 0.4s both;
  }

  .slide-in-4 {
    animation: slideIn 0.6s ease-out 0.5s both;
  }

  .slide-in-5 {
    animation: slideIn 0.6s ease-out 0.6s both;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes bounce-dot {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
