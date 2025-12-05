<!-- <script lang="ts">
  import { Stores, Helpers } from '$lib/index';
  import { PomodoroEventTypeEnum } from '$lib/stores';

  const { machine } = Stores.Pomodoro;

  $: ({ state, context } = $machine);
  const { send } = machine;
</script>

<h1 class="text-3xl font-bold text-red-500">POMOFRIENDS</h1>

<div class="flex flex-col items-center gap-4">
  <div class="text-sm uppercase tracking-wide text-gray-400">
    {context.mode}
  </div>

  <div class="text-6xl font-mono">
    {Helpers.formatTime(context.remaining)}
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
</div> -->

<script lang="ts">
  import PomodoroTimer from '$lib/components/PomodoroTimer.svelte';
  import TaskList from '$lib/components/TaskList.svelte';
  import GroupChat from '$lib/components/GroupChat.svelte';
</script>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <div class="flex flex-col gap-6">
    <PomodoroTimer />
    <TaskList />
  </div>
  <GroupChat />
</div>
