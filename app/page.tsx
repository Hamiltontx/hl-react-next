import { UserList } from "@/app/components/UserList";
import { Counter } from "@/app/components/Counter";
import { GitHubRepos } from "@/app/components/GitHubRepos";
import { OptimizedList } from "@/app/components/OptimizedList";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-4xl font-bold mb-8 flex items-center gap-4">
        <Image
          src="https://hirelatam.com/wp-content/uploads/2023/10/HL-LOGO-RGB_HORIZONTAL-1536x275.webp"
          alt="HireLATAM Logo"
          width={180}
          height={32}
          style={{ marginTop: '7px' }}
          priority
        />
         - React Coding Questions
      </h1>
      
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">1. User List with Online Status</h2>
        <div className="border rounded-lg">
          <UserList />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">2. Counter with useReducer</h2>
        <div className="border rounded-lg">
          <Counter />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">3. GitHub Repositories</h2>
        <div className="border rounded-lg">
          <GitHubRepos />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">4. Optimized List</h2>
        <div className="border rounded-lg">
          <OptimizedList />
        </div>
      </section>
    </div>
  );
}
