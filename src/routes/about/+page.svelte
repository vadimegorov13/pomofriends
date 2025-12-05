<script lang="ts">
  import Icon from '@iconify/svelte';
</script>

<div class="max-w-4xl mx-auto">
  <div class="mb-8">
    <h1 class="text-4xl font-bold text-text mb-4">About PomoFriends</h1>
    <p class="text-xl text-text-secondary">
      Stay focused and productive with friends using the Pomodoro Technique.
    </p>
  </div>

  <div class="grid gap-6 mb-12">
    <div class="bg-surface border border-border rounded-xl p-6 shadow-lg">
      <div class="flex items-start gap-4">
        <div class="p-3 bg-primary-100 rounded-lg">
          <Icon
            icon="lucide:timer"
            width="24"
            height="24"
            class="text-primary"
          />
        </div>
        <div>
          <h2 class="text-xl font-semibold text-text mb-2">
            Pomodoro Technique
          </h2>
          <p class="text-text-secondary leading-relaxed">
            Work in focused 25-minute intervals followed by short breaks. After
            four pomodoros, take a longer break. This proven technique helps
            maintain high levels of concentration while preventing burnout.
          </p>
        </div>
      </div>
    </div>

    <div class="bg-surface border border-border rounded-xl p-6 shadow-lg">
      <div class="flex items-start gap-4">
        <div class="p-3 bg-secondary-100 rounded-lg">
          <Icon
            icon="lucide:users"
            width="24"
            height="24"
            class="text-secondary"
          />
        </div>
        <div>
          <h2 class="text-xl font-semibold text-text mb-2">Study Together</h2>
          <p class="text-text-secondary leading-relaxed">
            Join study groups and work alongside others. See what your friends
            are working on, track their progress, and stay motivated together.
            Share your achievements and encourage each other to stay focused.
          </p>
        </div>
      </div>
    </div>

    <div class="bg-surface border border-border rounded-xl p-6 shadow-lg">
      <div class="flex items-start gap-4">
        <div class="p-3 bg-accent-muted rounded-lg">
          <Icon
            icon="lucide:target"
            width="24"
            height="24"
            class="text-accent"
          />
        </div>
        <div>
          <h2 class="text-xl font-semibold text-text mb-2">Task Management</h2>
          <p class="text-text-secondary leading-relaxed">
            Organize your work with built-in task management. Set focus tasks,
            estimate pomodoros needed, and track completion. Keep everything in
            one place without switching between apps.
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-surface border border-border rounded-xl p-8 shadow-lg">
    <h2 class="text-2xl font-bold text-text mb-6">How It Works</h2>
    <div class="space-y-4">
      <div class="flex gap-4">
        <div
          class="shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold"
        >
          1
        </div>
        <div>
          <h3 class="font-semibold text-text mb-1">Choose Your Task</h3>
          <p class="text-text-secondary">
            Select a task from your list or add a new one to focus on.
          </p>
        </div>
      </div>
      <div class="flex gap-4">
        <div
          class="shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold"
        >
          2
        </div>
        <div>
          <h3 class="font-semibold text-text mb-1">Start the Timer</h3>
          <p class="text-text-secondary">
            Begin a 25-minute focused work session with no distractions.
          </p>
        </div>
      </div>
      <div class="flex gap-4">
        <div
          class="shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold"
        >
          3
        </div>
        <div>
          <h3 class="font-semibold text-text mb-1">Take a Break</h3>
          <p class="text-text-secondary">
            When the timer rings, take a 5-minute break to recharge.
          </p>
        </div>
      </div>
      <div class="flex gap-4">
        <div
          class="shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold"
        >
          4
        </div>
        <div>
          <h3 class="font-semibold text-text mb-1">Repeat & Rest</h3>
          <p class="text-text-secondary">
            After four pomodoros, reward yourself with a longer 15-minute break.
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="mt-12 text-center">
    <a
      href="/"
      class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-hover transition-all shadow-lg"
    >
      <Icon icon="lucide:arrow-left" width="20" height="20" />
      Back to Timer
    </a>
  </div>
</div>
