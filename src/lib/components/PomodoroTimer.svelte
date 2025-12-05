<script lang="ts">
  import { onDestroy } from 'svelte';
  import Icon from '@iconify/svelte';

  type Mode = 'pomodoro' | 'shortBreak' | 'longBreak';

  let currentMode: Mode = 'pomodoro';
  let timeLeft = 25 * 60; // 25 minutes in seconds
  let isRunning = false;
  let timerInterval: number | undefined;

  const modeDurations = {
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  };

  $: minutes = Math.floor(timeLeft / 60);
  $: seconds = timeLeft % 60;
  $: formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  function startTimer() {
    if (!isRunning) {
      isRunning = true;
      timerInterval = window.setInterval(() => {
        if (timeLeft > 0) {
          timeLeft--;
        } else {
          stopTimer();
          alert('Pomodoro session completed!');
        }
      }, 1000);
    } else {
      stopTimer();
    }
  }

  function stopTimer() {
    isRunning = false;
    if (timerInterval) {
      clearInterval(timerInterval);
    }
  }

  function resetTimer() {
    stopTimer();
    timeLeft = modeDurations[currentMode];
  }

  function skipSession() {
    resetTimer();
  }

  function switchMode(mode: Mode) {
    currentMode = mode;
    stopTimer();
    timeLeft = modeDurations[mode];
  }

  onDestroy(() => {
    if (timerInterval) {
      clearInterval(timerInterval);
    }
  });
</script>

<div
  class="bg-surface border border-border rounded-xl p-6 flex flex-col shadow-lg"
>
  <div class="flex justify-between items-center mb-6">
    <h2 class="text-xl font-semibold text-text">Pomodoro Timer</h2>
    <button
      class="p-2 rounded-lg border border-border text-text-secondary hover:bg-bg-accent hover:text-text transition-all"
      title="Settings"
      aria-label="Timer settings"
    >
      <Icon icon="lucide:settings" width="20" height="20" />
    </button>
  </div>
  <div class="flex flex-col items-center gap-6">
    <div class="flex gap-2 bg-bg-muted p-1 rounded-lg border border-border">
      <button
        class="px-4 py-2 rounded-md font-medium text-sm transition-all {currentMode ===
        'pomodoro'
          ? 'bg-primary text-text-inverse'
          : 'bg-transparent text-text-secondary hover:text-text'}"
        on:click={() => switchMode('pomodoro')}
      >
        Pomodoro
      </button>
      <button
        class="px-4 py-2 rounded-md font-medium text-sm transition-all {currentMode ===
        'shortBreak'
          ? 'bg-primary text-text-inverse'
          : 'bg-transparent text-text-secondary hover:text-text'}"
        on:click={() => switchMode('shortBreak')}
      >
        Short Break
      </button>
      <button
        class="px-4 py-2 rounded-md font-medium text-sm transition-all {currentMode ===
        'longBreak'
          ? 'bg-primary text-text-inverse'
          : 'bg-transparent text-text-secondary hover:text-text'}"
        on:click={() => switchMode('longBreak')}
      >
        Long Break
      </button>
    </div>
    <div class="text-7xl font-bold tabular-nums tracking-tight text-text">
      {formattedTime}
    </div>
    <div class="flex gap-4">
      <button
        class="px-8 py-3.5 rounded-lg font-semibold text-base bg-primary hover:bg-primary-hover text-text-inverse transition-all shadow-lg hover:shadow-xl"
        on:click={startTimer}
      >
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button
        class="px-5 py-2.5 rounded-lg font-semibold text-sm bg-bg-muted hover:bg-bg-accent text-text-secondary hover:text-text transition-all border border-border"
        on:click={resetTimer}
      >
        Reset
      </button>
      <button
        class="px-5 py-2.5 rounded-lg font-semibold text-sm bg-bg-muted hover:bg-bg-accent text-text-secondary hover:text-text transition-all border border-border"
        on:click={skipSession}
      >
        Skip
      </button>
    </div>
    <div class="text-sm text-text-muted">
      <span>Session 1 of 4</span>
    </div>
  </div>
</div>
