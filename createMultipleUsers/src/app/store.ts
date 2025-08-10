// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/users/usersSlice";
import type { UsersState } from "../features/users/types";

/**
 * We declare RootState shape here based on features types,
 * so loadState/saveState can be typed safely before creating store.
 */
export type RootState = {
  users: UsersState;
};

function loadState(): RootState | undefined {
  try {
    const serialized = sessionStorage.getItem("reduxState");
    if (!serialized) return undefined;
    return JSON.parse(serialized) as RootState;
  } catch {
    return undefined;
  }
}

function saveState(state: RootState): void {
  try {
    sessionStorage.setItem("reduxState", JSON.stringify(state));
  } catch {
    // ignore
  }
}

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState() as RootState);
});

// exported types
export type AppDispatch = typeof store.dispatch;
export type AppRootState = ReturnType<typeof store.getState>;
