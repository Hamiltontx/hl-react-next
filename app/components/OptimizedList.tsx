"use client";

import React, { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Item {
  id: number;
  text: string;
}

interface ItemProps {
  item: Item;
  onDelete: (id: number) => void;
}

// Memoized child component to prevent unnecessary re-renders
const ListItem = React.memo(function ListItem({ item, onDelete }: ItemProps) {
  console.log(`Rendering ListItem ${item.id}`);
  return (
    <li className="flex items-center justify-between p-2 bg-background rounded-lg border">
      <span>{item.text}</span>
      <Button variant="destructive" size="sm" onClick={() => onDelete(item.id)}>
        Delete
      </Button>
    </li>
  );
});

export function OptimizedList() {
  const [items, setItems] = useState<Item[]>([
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2" },
    { id: 3, text: "Item 3" },
  ]);
  const [newItemText, setNewItemText] = useState("");

  // Memoized callback to prevent recreation on every render
  const handleDelete = useCallback((id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  // Memoized callback for adding new items
  const handleAddItem = useCallback(() => {
    if (!newItemText.trim()) return;

    setItems((prevItems) => [
      ...prevItems,
      {
        id: Math.max(0, ...prevItems.map((item) => item.id)) + 1,
        text: newItemText.trim(),
      },
    ]);
    setNewItemText(""); 
  }, [newItemText]);

  // Handle Enter key press
  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleAddItem();
      }
    },
    [handleAddItem]
  );

  // Memoized computation that only updates when items change
  const totalItems = useMemo(() => {
    console.log("Calculating total items", items.length);
    return items.length;
  }, [items]);

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl font-bold mb-4">Optimized List</h2>
      
      <div className="flex gap-2 mb-4">
        <Input
          type="text"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter new item text"
          className="max-w-xs"
        />
        <Button onClick={handleAddItem} disabled={!newItemText.trim()}>
          Add Item
        </Button>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <span className="text-sm text-muted-foreground">
          Total Items: {totalItems}
        </span>
      </div>

      <ul className="space-y-2">
        {items.map((item) => (
          <ListItem key={item.id} item={item} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
} 