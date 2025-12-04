import { pomodoroMachine, createPomodoroMachine } from './machine';

import type {
  TimerMode,
  MachineStateName,
  PomodoroContext,
  PomodoroState,
  PomodoroEvent,
} from './types';
import { PomodoroEventTypeEnum } from './types';

// Re-export all types directly
export type {
  TimerMode,
  MachineStateName,
  PomodoroContext,
  PomodoroState,
  PomodoroEvent,
};

export { PomodoroEventTypeEnum };

// Export the main pomodoro object
export default {
  machine: pomodoroMachine,
  createMachine: createPomodoroMachine,
};
