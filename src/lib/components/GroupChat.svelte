<script lang="ts">
  import Icon from '@iconify/svelte';

  type ParticipantStatus = 'active' | 'break' | 'idle';

  interface Participant {
    id: number;
    name: string;
    initials: string;
    color: string;
    status: ParticipantStatus;
    currentTask: string;
    timeRemaining: string;
  }

  interface ChatMessage {
    id: number;
    author: string;
    authorInitials: string;
    authorColor: string;
    time: string;
    message: string;
  }

  let participants: Participant[] = [
    {
      id: 1,
      name: 'John Smith',
      initials: 'JS',
      color: '#6366f1',
      status: 'active',
      currentTask: 'Working on: React components',
      timeRemaining: '18:30 remaining',
    },
    {
      id: 2,
      name: 'Sarah Davis',
      initials: 'SD',
      color: '#ec4899',
      status: 'break',
      currentTask: 'On break',
      timeRemaining: '3:45 remaining',
    },
    {
      id: 3,
      name: 'Mike Chen',
      initials: 'MC',
      color: '#10b981',
      status: 'active',
      currentTask: 'Working on: Database design',
      timeRemaining: '22:15 remaining',
    },
    {
      id: 4,
      name: 'Emma Rodriguez',
      initials: 'ER',
      color: '#f59e0b',
      status: 'idle',
      currentTask: 'Idle',
      timeRemaining: '-',
    },
  ];

  let chatMessages: ChatMessage[] = [
    {
      id: 1,
      author: 'Sarah Davis',
      authorInitials: 'SD',
      authorColor: '#ec4899',
      time: '10:15 AM',
      message:
        'Just finished my second session! Anyone want to discuss design patterns during the break?',
    },
    {
      id: 2,
      author: 'Mike Chen',
      authorInitials: 'MC',
      authorColor: '#10b981',
      time: '10:17 AM',
      message: "Sure! I'm working on factory patterns right now.",
    },
    {
      id: 3,
      author: 'John Smith',
      authorInitials: 'JS',
      authorColor: '#6366f1',
      time: '10:18 AM',
      message: "I'll join you guys in 5 minutes when my break starts",
    },
  ];

  let chatDisabled = true;
  let activeTab: 'participants' | 'chat' = 'participants';
</script>

<div
  class="bg-surface border border-border rounded-xl p-6 flex flex-col max-h-[600px] shadow-lg"
>
  <div class="flex justify-between items-center mb-6">
    <h2 class="text-xl font-semibold text-text">Study Group - Async</h2>
    <button
      class="bg-transparent border-0 text-text-secondary cursor-pointer p-2 rounded-md transition-all hover:bg-bg-accent hover:text-text flex items-center justify-center"
      title="Group Settings"
      aria-label="Group settings"
    >
      <Icon icon="lucide:settings" width="20" height="20" />
    </button>
  </div>

  <!-- Tabs -->
  <div class="flex gap-2 mb-6 border-b border-border">
    <button
      class="px-4 py-2 font-medium text-sm transition-all relative {activeTab ===
      'participants'
        ? 'text-primary border-b-2 border-primary'
        : 'text-text-secondary hover:text-text'}"
      on:click={() => (activeTab = 'participants')}
    >
      Participants
      <span
        class="ml-2 px-2 py-0.5 rounded-full text-xs font-semibold {activeTab ===
        'participants'
          ? 'bg-primary text-white'
          : 'bg-bg-accent text-text-secondary'}"
      >
        {participants.length}
      </span>
    </button>
    <button
      class="px-4 py-2 font-medium text-sm transition-all relative {activeTab ===
      'chat'
        ? 'text-primary border-b-2 border-primary'
        : 'text-text-secondary hover:text-text'}"
      on:click={() => (activeTab = 'chat')}
    >
      Chat
    </button>
  </div>

  <!-- Participants Tab -->
  {#if activeTab === 'participants'}
    <div class="flex flex-col gap-3 overflow-y-auto flex-1">
      {#each participants as participant (participant.id)}
        <div class="flex gap-3 p-3 bg-bg-foreground rounded-lg">
          <div class="relative">
            <div
              class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white"
              style="background: {participant.color};"
            >
              {participant.initials}
            </div>
            <div
              class={`w-2.5 h-2.5 rounded-full absolute bottom-0 right-0 border-2 border-surface ${participant.status === 'active' ? 'bg-green-500' : participant.status === 'break' ? 'bg-yellow-500' : 'bg-border'}`}
            ></div>
          </div>
          <div class="flex-1">
            <div class="font-semibold text-[0.9375rem] text-text mb-0.5">
              {participant.name}
            </div>
            <div class="text-[0.8125rem] text-text-secondary">
              {participant.currentTask}
            </div>
            <div class="text-xs text-text-muted mt-0.5">
              {participant.timeRemaining}
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}

  <!-- Chat Tab -->
  {#if activeTab === 'chat'}
    <div class="flex-1 flex flex-col min-h-0">
      <div class="flex-1 overflow-y-auto flex flex-col gap-4 mb-4 pr-2">
        {#each chatMessages as message (message.id)}
          <div class="flex gap-3">
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white shrink-0"
              style="background: {message.authorColor};"
            >
              {message.authorInitials}
            </div>
            <div class="flex-1">
              <div class="flex gap-2 items-baseline mb-1">
                <span class="font-semibold text-sm text-text"
                  >{message.author}</span
                >
                <span class="text-xs text-text-muted">{message.time}</span>
              </div>
              <div class="text-sm text-text-secondary leading-relaxed">
                {message.message}
              </div>
            </div>
          </div>
        {/each}
      </div>
      <div class="flex gap-2">
        <input
          type="text"
          class="flex-1 bg-bg-foreground border border-border rounded-lg px-3 py-3 text-text text-sm focus:outline-none focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Type a message..."
          disabled={chatDisabled}
        />
        <button
          class="px-4 py-2 border-0 rounded-lg font-semibold cursor-pointer transition-all text-sm bg-primary text-text-inverse hover:bg-primary-hover disabled:bg-bg-muted disabled:cursor-not-allowed disabled:text-text-muted"
          disabled={chatDisabled}>Send</button
        >
      </div>
      <div class="text-center text-xs text-text-muted mt-2">
        Chat is disabled during focus sessions
      </div>
    </div>
  {/if}
</div>
