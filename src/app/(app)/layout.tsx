// import { redirect } from "next/navigation"; // uncomment when auth is wired up
import { Sidebar } from "@/components/app/Sidebar";

// TODO: Replace with your actual auth check (e.g. next-auth, clerk, custom session)
async function getSession() {
  // Stub — always returns null until auth is wired up
  return null;
}

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session) {
    // Comment out the redirect below during development to access the dashboard without auth
    // redirect("/login");
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <main id="main-content" className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
