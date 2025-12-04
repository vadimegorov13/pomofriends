<script lang="ts">
  import { Pomodoro, PomodoroEventTypeEnum } from '$lib/index';

  const machine = Pomodoro.machine;
  $: ({ state, context } = $machine);

  const { send } = Pomodoro.machine;

  function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }
</script>

<h1 class="text-3xl font-bold text-red-500">POMOFRIENDS</h1>

<div class="flex flex-col items-center gap-4">
  <div class="text-sm uppercase tracking-wide text-gray-400">
    {context.mode}
  </div>

  <div class="text-6xl font-mono">
    {formatTime(context.remaining)}
  </div>

  <div class="flex gap-2">
    {#if state === 'idle' || state === 'finished'}
      <button
        class="px-4 py-2 rounded bg-red-500 text-white"
        on:click={() => send({ type: PomodoroEventTypeEnum.START_FOCUS })}
      >
        Start Focus
      </button>
    {:else if state === 'running'}
      <button
        class="px-4 py-2 rounded bg-gray-200"
        on:click={() => send({ type: PomodoroEventTypeEnum.PAUSE })}
      >
        Pause
      </button>
      <button
        class="px-4 py-2 rounded bg-gray-200"
        on:click={() => send({ type: PomodoroEventTypeEnum.SKIP })}
      >
        Skip
      </button>
    {:else if state === 'paused'}
      <button
        class="px-4 py-2 rounded bg-emerald-500 text-white"
        on:click={() => send({ type: PomodoroEventTypeEnum.RESUME })}
      >
        Resume
      </button>
    {/if}
  </div>

  {#if state === 'finished'}
    <div class="text-xs text-gray-500">
      Finished! Pomodoros completed: {context.pomodorosCompleted}
    </div>
  {/if}
</div>
