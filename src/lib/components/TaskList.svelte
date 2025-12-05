<script lang="ts">
  import Icon from '@iconify/svelte';

  type TaskType = 'work' | 'personal' | 'study';

  interface Task {
    id: number;
    title: string;
    estimate: number;
    type: TaskType;
    completed: boolean;
    isFocused?: boolean;
  }

  let isCollapsed = false;
  let tasks: Task[] = [
    {
      id: 1,
      title: 'Complete project documentation',
      estimate: 3,
      type: 'work',
      completed: false,
      isFocused: true,
    },
    {
      id: 2,
      title: 'Review pull requests',
      estimate: 2,
      type: 'work',
      completed: false,
    },
    {
      id: 3,
      title: 'Daily standup meeting',
      estimate: 1,
      type: 'personal',
      completed: true,
    },
    {
      id: 4,
      title: 'Study algorithm patterns',
      estimate: 4,
      type: 'study',
      completed: false,
    },
  ];

  $: focusedTask = tasks.find((task) => task.isFocused);
  $: displayedTasks = isCollapsed && focusedTask ? [focusedTask] : tasks;

  function toggleTask(taskId: number) {
    tasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
  }

  function toggleCollapse() {
    isCollapsed = !isCollapsed;
  }

  function setFocusedTask(taskId: number) {
    tasks = tasks.map((task) => ({
      ...task,
      isFocused: task.id === taskId,
    }));
  }
</script>

<div
  class="bg-surface border border-border rounded-xl p-6 flex flex-col max-h-[600px] shadow-lg"
>
  <div class="flex justify-between items-center mb-6">
    <h2 class="text-xl font-semibold text-text">Tasks</h2>
    <div class="flex gap-2">
      <button
        class="p-2 rounded-lg border border-border text-text-secondary hover:bg-bg-accent hover:text-text transition-all"
        title={isCollapsed ? 'Expand tasks' : 'Focus mode'}
        aria-label={isCollapsed ? 'Expand tasks' : 'Collapse to focused task'}
        on:click={toggleCollapse}
      >
        <Icon
          icon={isCollapsed ? 'lucide:maximize-2' : 'lucide:minimize-2'}
          width="20"
          height="20"
        />
      </button>
      <button
        class="p-2 rounded-lg border border-border text-text-secondary hover:bg-bg-accent hover:text-text transition-all"
        title="Add Task"
        aria-label="Add new task"
      >
        <Icon icon="lucide:plus" width="20" height="20" />
      </button>
    </div>
  </div>
  {#if isCollapsed && focusedTask}
    <div
      class="flex items-center gap-2 px-3 py-3 bg-primary-50 rounded-lg mb-4 text-primary text-sm font-semibold border border-primary-200"
    >
      <Icon icon="lucide:focus" width="16" height="16" />
      <span>Focus Mode - Currently working on:</span>
    </div>
  {/if}
  <div class="flex flex-col gap-3 overflow-y-auto flex-1">
    {#each displayedTasks as task (task.id)}
      <div
        class="flex gap-3 px-4 py-4 bg-bg-foreground rounded-lg items-start transition-all hover:bg-bg-accent {task.isFocused
          ? 'border-2 border-primary bg-primary-50'
          : 'border border-border'}"
      >
        {#if !isCollapsed}
          <button
            class="flex items-center justify-center transition-all {task.isFocused
              ? 'text-primary'
              : 'text-text-muted hover:text-primary'}"
            on:click={() => setFocusedTask(task.id)}
            title={task.isFocused ? 'Currently focused' : 'Set as focused task'}
            aria-label={task.isFocused
              ? 'Currently focused'
              : 'Set as focused task'}
          >
            <Icon
              icon={task.isFocused ? 'lucide:circle-dot' : 'lucide:circle'}
              width="16"
              height="16"
            />
          </button>
        {/if}
        <div class="task-checkbox">
          <input
            type="checkbox"
            id="task{task.id}"
            checked={task.completed}
            on:change={() => toggleTask(task.id)}
          />
          <label for="task{task.id}"></label>
        </div>
        <div class="flex-1 {task.completed ? 'opacity-60' : ''}">
          <div
            class="font-medium mb-1 {task.completed
              ? 'line-through text-text-muted'
              : 'text-text'}"
          >
            {task.title}
          </div>
          <div class="flex gap-3 items-center text-xs text-text-muted">
            <span class="font-semibold">Est: {task.estimate} pomos</span>
            <span
              class="px-2 py-0.5 rounded text-xxs font-bold uppercase tracking-wide {task.type ===
              'work'
                ? 'bg-primary-100 text-primary'
                : task.type === 'personal'
                  ? 'bg-secondary-100 text-secondary'
                  : 'bg-accent-muted text-accent'}"
            >
              {task.type}
            </span>
          </div>
        </div>
        <div>
          <button
            class="p-1 rounded text-text-muted hover:bg-bg-accent hover:text-text transition-all"
            aria-label="Edit task"
          >
            <Icon icon="lucide:pencil" width="16" height="16" />
          </button>
        </div>
      </div>
    {/each}
  </div>
</div>
