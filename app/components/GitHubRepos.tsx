"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import axios from "axios";

interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
}

export function GitHubRepos() {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debouncedUsername, setDebouncedUsername] = useState("");

  // I've created this to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedUsername(username);
    }, 500);

    return () => clearTimeout(timer);
  }, [username]);

  // Fetch repo only when debounced username changes
  useEffect(() => {
    async function fetchRepos() {
      if (!debouncedUsername) {
        setRepos([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const { data } = await axios.get(
          `https://api.github.com/users/${debouncedUsername}/repos`
        );
        setRepos(data);
      } catch (err) {
        setError(
          axios.isAxiosError(err)
            ? err.response?.data?.message || err.message
            : "An error occurred"
        );
        setRepos([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRepos();
  }, [debouncedUsername]);

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl font-bold mb-4">GitHub Repositories</h2>
      <div className="flex gap-2 mb-4">
        <Input
          type="text"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
          placeholder="Enter GitHub username"
          className="max-w-xs"
        />
      </div>

      {isLoading && <p className="text-muted-foreground">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul className="space-y-2">
        {repos.map((repo) => (
          <li
            key={repo.id}
            className="p-4 border rounded-lg bg-background hover:bg-accent/50 transition-colors"
          >
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <h3 className="font-semibold text-lg">{repo.name}</h3>
              {repo.description && (
                <p className="text-muted-foreground text-sm mt-1">
                  {repo.description}
                </p>
              )}
              <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                <span>⭐ {repo.stargazers_count}</span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
} 