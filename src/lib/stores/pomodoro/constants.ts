import type { PomodoroState } from './types';

export const initialState: PomodoroState = {
  state: 'idle',
  context: {
    mode: 'focus',
    remaining: 25 * 60,
    durations: {
      focus: 25 * 60,
      short_break: 5 * 60,
      long_break: 15 * 60,
    },
    pomodorosCompleted: 0,
    longBreakInterval: 4,
  },
};
