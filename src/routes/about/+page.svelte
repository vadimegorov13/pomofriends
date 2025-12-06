<script lang="ts">
  import Icon from '@iconify/svelte';
  import { onMount } from 'svelte';

  let isVisible = false;

  onMount(() => {
    // Trigger animations after component mounts
    setTimeout(() => {
      isVisible = true;
    }, 100);
  });
</script>

<div class="max-w-4xl mx-auto">
  <div
    class="mb-8 transition-all duration-700 {isVisible
      ? 'opacity-100 translate-y-0'
      : 'opacity-0 -translate-y-4'}"
  >
    <h1 class="text-4xl font-bold text-text mb-4">
      About <span class="text-primary">Pomo</span><span class="text-secondary"
        >Friends</span
      >
    </h1>
    <p class="text-xl text-text-secondary">
      Stay <span class="font-semibold text-primary">focused</span> and
      <span class="font-semibold text-secondary">productive</span> with friends using
      the Pomodoro Technique.
    </p>
  </div>

  <div class="grid gap-6 mb-12">
    <div
      class="bg-surface border border-border rounded-xl p-6 shadow-lg transition-all duration-700 delay-100 hover:shadow-xl {isVisible
        ? 'opacity-100 translate-x-0'
        : 'opacity-0 -translate-x-8'}"
    >
      <div class="flex items-start gap-4">
        <div
          class="p-3 bg-primary-100 rounded-lg transition-transform duration-300 hover:rotate-12"
        >
          <Icon
            icon="lucide:timer"
            width="24"
            height="24"
            class="text-primary"
          />
        </div>
        <div>
          <h2 class="text-xl font-semibold text-text mb-2">
            <span class="text-primary">Pomodoro</span> Technique
          </h2>
          <p class="text-text-secondary leading-relaxed">
            Work in focused <span class="font-semibold text-primary"
              >25-minute intervals</span
            >
            followed by short breaks. After four pomodoros, take a longer break. This
            proven technique helps maintain
            <span class="font-semibold text-text"
              >high levels of concentration</span
            > while preventing burnout.
          </p>
        </div>
      </div>
    </div>

    <div
      class="bg-surface border border-border rounded-xl p-6 shadow-lg transition-all duration-700 delay-200 hover:shadow-xl {isVisible
        ? 'opacity-100 translate-x-0'
        : 'opacity-0 translate-x-8'}"
    >
      <div class="flex items-start gap-4">
        <div
          class="p-3 bg-secondary-100 rounded-lg transition-transform duration-300 hover:rotate-12"
        >
          <Icon
            icon="lucide:users"
            width="24"
            height="24"
            class="text-secondary"
          />
        </div>
        <div>
          <h2 class="text-xl font-semibold text-text mb-2">
            Study <span class="text-secondary">Together</span>
          </h2>
          <p class="text-text-secondary leading-relaxed">
            Join <span class="font-semibold text-secondary">study groups</span>
            and work alongside others. See what your friends are working on, track
            their progress, and stay
            <span class="font-semibold text-text">motivated together</span>.
            Share your achievements and encourage each other to stay focused.
          </p>
        </div>
      </div>
    </div>

    <div
      class="bg-surface border border-border rounded-xl p-6 shadow-lg transition-all duration-700 delay-300 hover:shadow-xl {isVisible
        ? 'opacity-100 translate-x-0'
        : 'opacity-0 -translate-x-8'}"
    >
      <div class="flex items-start gap-4">
        <div
          class="p-3 bg-accent-muted rounded-lg transition-transform duration-300 hover:rotate-12"
        >
          <Icon
            icon="lucide:target"
            width="24"
            height="24"
            class="text-accent"
          />
        </div>
        <div>
          <h2 class="text-xl font-semibold text-text mb-2">
            Task <span class="text-accent">Management</span>
          </h2>
          <p class="text-text-secondary leading-relaxed">
            Organize your work with built-in <span
              class="font-semibold text-accent">task management</span
            >. Set focus tasks, estimate pomodoros needed, and track completion.
            Keep
            <span class="font-semibold text-text">everything in one place</span> without
            switching between apps.
          </p>
        </div>
      </div>
    </div>
  </div>

  <div
    class="bg-surface border border-border rounded-xl p-8 shadow-lg transition-all duration-700 delay-400 {isVisible
      ? 'opacity-100 translate-y-0'
      : 'opacity-0 translate-y-8'}"
  >
    <h2 class="text-2xl font-bold text-text mb-6">
      How It <span class="text-primary">Works</span>
    </h2>
    <div class="space-y-4">
      <div class="flex gap-4 group">
        <div
          class="shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold transition-transform duration-300 group-hover:rotate-12"
        >
          1
        </div>
        <div
          class="transition-transform duration-300 group-hover:translate-x-2"
        >
          <h3 class="font-semibold text-text mb-1">Choose Your Task</h3>
          <p class="text-text-secondary">
            Select a task from your list or add a new one to focus on.
          </p>
        </div>
      </div>
      <div class="flex gap-4 group">
        <div
          class="shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold transition-transform duration-300 group-hover:rotate-12"
        >
          2
        </div>
        <div
          class="transition-transform duration-300 group-hover:translate-x-2"
        >
          <h3 class="font-semibold text-text mb-1">Start the Timer</h3>
          <p class="text-text-secondary">
            Begin a <span class="font-semibold text-primary">25-minute</span> focused
            work session with no distractions.
          </p>
        </div>
      </div>
      <div class="flex gap-4 group">
        <div
          class="shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold transition-transform duration-300 group-hover:rotate-12"
        >
          3
        </div>
        <div
          class="transition-transform duration-300 group-hover:translate-x-2"
        >
          <h3 class="font-semibold text-text mb-1">Take a Break</h3>
          <p class="text-text-secondary">
            When the timer rings, take a <span
              class="font-semibold text-secondary">5-minute</span
            > break to recharge.
          </p>
        </div>
      </div>
      <div class="flex gap-4 group">
        <div
          class="shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold transition-transform duration-300 group-hover:rotate-12"
        >
          4
        </div>
        <div
          class="transition-transform duration-300 group-hover:translate-x-2"
        >
          <h3 class="font-semibold text-text mb-1">Repeat & Rest</h3>
          <p class="text-text-secondary">
            After four pomodoros, reward yourself with a longer <span
              class="font-semibold text-secondary">15-minute</span
            > break.
          </p>
        </div>
      </div>
    </div>
  </div>

  <div
    class="mt-12 text-center transition-all duration-700 delay-500 {isVisible
      ? 'opacity-100'
      : 'opacity-0'}"
  >
    <a
      href="/"
      class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-hover transition-all shadow-lg"
    >
      <Icon icon="lucide:arrow-left" width="20" height="20" />
      Back to Timer
    </a>
  </div>
</div>
