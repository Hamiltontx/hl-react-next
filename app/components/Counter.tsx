"use client";

import { useReducer } from "react";
import { Button } from "@/components/ui/button";

interface CounterState {
  count: number;
}

type CounterAction =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "RESET" };

function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "RESET":
      return { count: 0 };
    default:
      return state;
  }
}

export function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl font-bold mb-4">Counter</h2>
      <div className="flex flex-col items-center gap-4">
        <span className="text-4xl font-bold">{state.count}</span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => dispatch({ type: "DECREMENT" })}
          >
            Decrement
          </Button>
          <Button onClick={() => dispatch({ type: "RESET" })}>Reset</Button>
          <Button
            variant="outline"
            onClick={() => dispatch({ type: "INCREMENT" })}
          >
            Increment
          </Button>
        </div>
      </div>
    </div>
  );
} 