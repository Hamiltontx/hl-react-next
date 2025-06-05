"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface User {
  id: number;
  name: string;
  isOnline: boolean;
}

export function UserList() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Almudena Manzanilla", isOnline: true },
    { id: 2, name: "Ana Santos", isOnline: false },
    { id: 3, name: "Pedro Oliveira", isOnline: true },
    { id: 4, name: "Mariana Costa", isOnline: false },
    { id: 5, name: "Lucas Ferreira", isOnline: true },
  ]);

  const toggleStatus = (userId: number) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, isOnline: !user.isOnline } : user
      )
    );
  };

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex items-center justify-between p-2 bg-background rounded-lg border"
          >
            <span
              className={`font-medium ${
                user.isOnline ? "text-green-500" : "text-red-500"
              }`}
            >
              {user.name}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleStatus(user.id)}
            >
              Toggle Status
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
} 