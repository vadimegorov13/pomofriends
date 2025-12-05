import { writable } from 'svelte/store';
import {
  type PomodoroState,
  type PomodoroEvent,
  PomodoroEventTypeEnum,
} from './types';
import { initialState } from './constants';
import transition from './transition';

function createPomodoroMachine() {
  const { subscribe, update, set } = writable<PomodoroState>(initialState);

  let interval: ReturnType<typeof setInterval> | null = null;

  function startTicking() {
    if (interval) return;

    interval = setInterval(() => {
      update((state) =>
        transition(state, { type: PomodoroEventTypeEnum.TICK })
      );
    }, 1000);
  }

  function stopTicking() {
    if (!interval) return;
    clearInterval(interval);
    interval = null;
  }

  function send(event: PomodoroEvent) {
    // we need to run transition AND handle side effects like intervals
    let nextState: PomodoroState;

    update((state) => {
      nextState = transition(state, event);

      // side effects based on new state
      if (state.state !== 'running' && nextState.state === 'running') {
        startTicking();
      } else if (state.state === 'running' && nextState.state !== 'running') {
        stopTicking();
      }

      // you can fire sounds/notifications here too

      return nextState!;
    });
  }

  function reset() {
    stopTicking();
    set(initialState);
  }

  return {
    subscribe,
    send,
    reset,
  };
}

export const machine = createPomodoroMachine();
