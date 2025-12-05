<script lang="ts">
  import Icon from '@iconify/svelte';

  interface LeaderboardEntry {
    rank: number;
    name: string;
    initials: string;
    color: string;
    pomodorosCompleted: number;
    weeklyStreak: number;
    totalHours: number;
  }

  let timeframe: 'week' | 'month' | 'allTime' = 'week';

  const leaderboardData: LeaderboardEntry[] = [
    {
      rank: 1,
      name: 'Sarah Davis',
      initials: 'SD',
      color: '#ec4899',
      pomodorosCompleted: 156,
      weeklyStreak: 7,
      totalHours: 65,
    },
    {
      rank: 2,
      name: 'Mike Chen',
      initials: 'MC',
      color: '#10b981',
      pomodorosCompleted: 142,
      weeklyStreak: 6,
      totalHours: 59,
    },
    {
      rank: 3,
      name: 'John Smith',
      initials: 'JS',
      color: '#6366f1',
      pomodorosCompleted: 138,
      weeklyStreak: 7,
      totalHours: 58,
    },
    {
      rank: 4,
      name: 'Emma Rodriguez',
      initials: 'ER',
      color: '#f59e0b',
      pomodorosCompleted: 124,
      weeklyStreak: 5,
      totalHours: 52,
    },
    {
      rank: 5,
      name: 'Alex Johnson',
      initials: 'AJ',
      color: '#8b5cf6',
      pomodorosCompleted: 118,
      weeklyStreak: 6,
      totalHours: 49,
    },
    {
      rank: 6,
      name: 'Lisa Wong',
      initials: 'LW',
      color: '#06b6d4',
      pomodorosCompleted: 95,
      weeklyStreak: 4,
      totalHours: 40,
    },
  ];

  function getRankBadgeColor(rank: number): string {
    if (rank === 1) return 'bg-yellow-400 text-yellow-900';
    if (rank === 2) return 'bg-gray-300 text-gray-800';
    if (rank === 3) return 'bg-amber-600 text-amber-100';
    return 'bg-bg-muted text-text-muted';
  }

  function getRankIcon(rank: number): string {
    if (rank === 1) return 'lucide:trophy';
    if (rank === 2) return 'lucide:medal';
    if (rank === 3) return 'lucide:award';
    return '';
  }
</script>

<div class="max-w-5xl mx-auto">
  <div class="mb-8">
    <h1 class="text-4xl font-bold text-text mb-4">Leaderboard</h1>
    <p class="text-xl text-text-secondary">
      See who's crushing their productivity goals this week.
    </p>
  </div>

  <!-- Timeframe Selector -->
  <div
    class="flex gap-2 mb-6 bg-surface border border-border rounded-lg p-1 w-fit shadow-lg"
  >
    <button
      class="px-4 py-2 rounded-md font-medium text-sm transition-all {timeframe ===
      'week'
        ? 'bg-primary text-text-inverse'
        : 'bg-transparent text-text-secondary hover:text-text'}"
      on:click={() => (timeframe = 'week')}
    >
      This Week
    </button>
    <button
      class="px-4 py-2 rounded-md font-medium text-sm transition-all {timeframe ===
      'month'
        ? 'bg-primary text-text-inverse'
        : 'bg-transparent text-text-secondary hover:text-text'}"
      on:click={() => (timeframe = 'month')}
    >
      This Month
    </button>
    <button
      class="px-4 py-2 rounded-md font-medium text-sm transition-all {timeframe ===
      'allTime'
        ? 'bg-primary text-text-inverse'
        : 'bg-transparent text-text-secondary hover:text-text'}"
      on:click={() => (timeframe = 'allTime')}
    >
      All Time
    </button>
  </div>

  <!-- Leaderboard Table -->
  <div
    class="bg-surface border border-border rounded-xl overflow-hidden shadow-lg"
  >
    <!-- Header -->
    <div class="bg-bg-foreground border-b border-border px-6 py-4">
      <div
        class="grid grid-cols-12 gap-4 items-center text-sm font-semibold text-text-secondary uppercase tracking-wider"
      >
        <div class="col-span-1">Rank</div>
        <div class="col-span-4">User</div>
        <div class="col-span-3 text-center">Pomodoros</div>
        <div class="col-span-2 text-center">Streak</div>
        <div class="col-span-2 text-center">Hours</div>
      </div>
    </div>

    <!-- Leaderboard Entries -->
    <div class="divide-y divide-border">
      {#each leaderboardData as entry (entry.rank)}
        <div
          class="px-6 py-4 hover:bg-bg-foreground transition-colors {entry.rank <=
          3
            ? 'bg-primary-50'
            : ''}"
        >
          <div class="grid grid-cols-12 gap-4 items-center">
            <!-- Rank -->
            <div class="col-span-1">
              <div
                class="w-10 h-10 rounded-full flex items-center justify-center font-bold {getRankBadgeColor(
                  entry.rank
                )}"
              >
                {#if entry.rank <= 3}
                  <Icon icon={getRankIcon(entry.rank)} width="20" height="20" />
                {:else}
                  {entry.rank}
                {/if}
              </div>
            </div>

            <!-- User -->
            <div class="col-span-4 flex items-center gap-3">
              <div
                class="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-sm"
                style="background: {entry.color};"
              >
                {entry.initials}
              </div>
              <div>
                <div class="font-semibold text-text">{entry.name}</div>
                {#if entry.rank === 1}
                  <div
                    class="text-xs text-primary font-semibold flex items-center gap-1"
                  >
                    <Icon icon="lucide:flame" width="12" height="12" />
                    Top Performer
                  </div>
                {/if}
              </div>
            </div>

            <!-- Pomodoros -->
            <div class="col-span-3 text-center">
              <div class="text-2xl font-bold text-text">
                {entry.pomodorosCompleted}
              </div>
              <div class="text-xs text-text-muted">completed</div>
            </div>

            <!-- Streak -->
            <div class="col-span-2 text-center">
              <div class="flex items-center justify-center gap-1">
                <Icon
                  icon="lucide:calendar-check"
                  width="16"
                  height="16"
                  class="text-primary"
                />
                <span class="text-lg font-semibold text-text"
                  >{entry.weeklyStreak}</span
                >
              </div>
              <div class="text-xs text-text-muted">days</div>
            </div>

            <!-- Total Hours -->
            <div class="col-span-2 text-center">
              <div class="text-lg font-semibold text-text">
                {entry.totalHours}h
              </div>
              <div class="text-xs text-text-muted">focused</div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Stats Cards -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
    <div class="bg-surface border border-border rounded-xl p-6 shadow-lg">
      <div class="flex items-center gap-3 mb-2">
        <div class="p-2 bg-primary-100 rounded-lg">
          <Icon
            icon="lucide:target"
            width="20"
            height="20"
            class="text-primary"
          />
        </div>
        <h3 class="font-semibold text-text">Your Rank</h3>
      </div>
      <div class="text-3xl font-bold text-text mb-1">12th</div>
      <p class="text-sm text-text-secondary">Out of 156 users</p>
    </div>

    <div class="bg-surface border border-border rounded-xl p-6 shadow-lg">
      <div class="flex items-center gap-3 mb-2">
        <div class="p-2 bg-secondary-100 rounded-lg">
          <Icon
            icon="lucide:zap"
            width="20"
            height="20"
            class="text-secondary"
          />
        </div>
        <h3 class="font-semibold text-text">This Week</h3>
      </div>
      <div class="text-3xl font-bold text-text mb-1">48</div>
      <p class="text-sm text-text-secondary">Pomodoros completed</p>
    </div>

    <div class="bg-surface border border-border rounded-xl p-6 shadow-lg">
      <div class="flex items-center gap-3 mb-2">
        <div class="p-2 bg-accent-muted rounded-lg">
          <Icon
            icon="lucide:trending-up"
            width="20"
            height="20"
            class="text-accent"
          />
        </div>
        <h3 class="font-semibold text-text">Progress</h3>
      </div>
      <div class="text-3xl font-bold text-primary mb-1">+24%</div>
      <p class="text-sm text-text-secondary">vs. last week</p>
    </div>
  </div>
</div>
