"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 3000;

const ToastContext = createContext();

let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

const toastTimeouts = new Map();

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
};

function reducer(state, action) {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };
    case actionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };
    case actionTypes.DISMISS_TOAST: {
      const { toastId } = action;

      if (toastId) addToRemoveQueue(toastId);
      else state.toasts.forEach((t) => addToRemoveQueue(t.id));

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined ? { ...t, open: false } : t
        ),
      };
    }
    case actionTypes.REMOVE_TOAST:
      return {
        ...state,
        toasts: action.toastId
          ? state.toasts.filter((t) => t.id !== action.toastId)
          : [],
      };
    default:
      return state;
  }
}

function addToRemoveQueue(toastId) {
  if (toastTimeouts.has(toastId)) return;

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({ type: actionTypes.REMOVE_TOAST, toastId });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
}

// Shared state
let memoryState = { toasts: [] };
const listeners = [];

function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => listener(memoryState));
}

function createToast({ ...props }) {
  const id = genId();

  const update = (props) => dispatch({
    type: actionTypes.UPDATE_TOAST,
    toast: { ...props, id },
  });

  const dismiss = () => dispatch({
    type: actionTypes.DISMISS_TOAST,
    toastId: id,
  });

  dispatch({
    type: actionTypes.ADD_TOAST,
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  return { id, dismiss, update };
}

export function ToastProvider({ children }) {
  const [state, setState] = useState(memoryState);

  useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index !== -1) listeners.splice(index, 1);
    };
  }, []);

  const contextValue = {
    ...state,
    toast: createToast,
    dismiss: (id) => dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id }),
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {/* Example Toast UI */}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {state.toasts.map((toast) =>
          toast.open ? (
            <div key={toast.id} className="bg-black text-white p-4 rounded shadow">
              <div className="font-bold">{toast.title}</div>
              <div>{toast.description}</div>
              {toast.action && <div>{toast.action}</div>}
            </div>
          ) : null
        )}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
