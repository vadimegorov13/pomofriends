export type TimerMode = 'focus' | 'short_break' | 'long_break';

export type MachineState = 'idle' | 'running' | 'paused' | 'finished';

export interface PomodoroContext {
  mode: TimerMode;
  remaining: number; // seconds
  durations: {
    focus: number;
    short_break: number;
    long_break: number;
  };
  pomodorosCompleted: number;
  longBreakInterval: number;
}

export interface PomodoroState {
  state: MachineState;
  context: PomodoroContext;
}

export type PomodoroEvent =
  | { type: PomodoroEventTypeEnum.START_FOCUS }
  | { type: PomodoroEventTypeEnum.START_SHORT_BREAK }
  | { type: PomodoroEventTypeEnum.START_LONG_BREAK }
  | { type: PomodoroEventTypeEnum.PAUSE }
  | { type: PomodoroEventTypeEnum.RESUME }
  | { type: PomodoroEventTypeEnum.TICK }
  | { type: PomodoroEventTypeEnum.SKIP }
  | {
      type: PomodoroEventTypeEnum.SETTINGS_UPDATED;
      payload: Partial<PomodoroContext['durations']>;
    };

export enum PomodoroEventTypeEnum {
  START_FOCUS = 'START_FOCUS',
  START_SHORT_BREAK = 'START_SHORT_BREAK',
  START_LONG_BREAK = 'START_LONG_BREAK',
  PAUSE = 'PAUSE',
  RESUME = 'RESUME',
  TICK = 'TICK',
  SKIP = 'SKIP',
  SETTINGS_UPDATED = 'SETTINGS_UPDATED',
}
