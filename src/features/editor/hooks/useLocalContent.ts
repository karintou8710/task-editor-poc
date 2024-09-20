import { useSyncExternalStore } from "react";

type Listener = () => void;

let listeners: Listener[] = [];

export default function useLocalContent() {
  return useSyncExternalStore(subscribe, getSnapShot);
}

const subscribe = (listener: Listener) => {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
};

const getSnapShot = () => {
  return localStorage.getItem("content");
};

export const setContent = (content: string) => {
  localStorage.setItem("content", content);
  for (const listener of listeners) {
    listener();
  }
};
