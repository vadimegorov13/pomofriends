import type { PomodoroState, PomodoroEvent } from './types';

export function transition(
  pomodoroState: PomodoroState,
  event: PomodoroEvent
): PomodoroState {
  const { state, context } = pomodoroState;

  switch (event.type) {
    case 'START_FOCUS': {
      return {
        state: 'running',
        context: {
          ...context,
          mode: 'focus',
          remaining: context.durations.focus,
        },
      };
    }

    case 'START_SHORT_BREAK': {
      return {
        state: 'running',
        context: {
          ...context,
          mode: 'short_break',
          remaining: context.durations.short_break,
        },
      };
    }

    case 'START_LONG_BREAK': {
      return {
        state: 'running',
        context: {
          ...context,
          mode: 'long_break',
          remaining: context.durations.long_break,
        },
      };
    }

    case 'PAUSE': {
      if (state !== 'running') return pomodoroState;
      return { ...pomodoroState, state: 'paused' };
    }

    case 'RESUME': {
      if (state !== 'paused') return pomodoroState;
      return { ...pomodoroState, state: 'running' };
    }

    case 'TICK': {
      if (state !== 'running') return pomodoroState;
      if (context.remaining <= 1) {
        // timer finished -> move to finished state
        let pomodorosCompleted = context.pomodorosCompleted;
        if (context.mode === 'focus') {
          pomodorosCompleted += 1;
        }

        return {
          state: 'finished',
          context: {
            ...context,
            remaining: 0,
            pomodorosCompleted,
          },
        };
      }

      return {
        ...pomodoroState,
        context: {
          ...context,
          remaining: context.remaining - 1,
        },
      };
    }

    case 'SKIP': {
      // Skip current session but keep stats as-is
      return {
        state: 'finished',
        context: { ...context, remaining: 0 },
      };
    }

    case 'SETTINGS_UPDATED': {
      const durations = {
        ...context.durations,
        ...event.payload,
      };

      return {
        ...pomodoroState,
        context: {
          ...context,
          durations,
          // optional: reset remaining if idle
          remaining:
            pomodoroState.state === 'idle'
              ? durations.focus
              : context.remaining,
        },
      };
    }

    default:
      return pomodoroState;
  }
}
