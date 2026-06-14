import { Sidebar } from "@/components/app/Sidebar";

async function getSession() {
  return null;
}

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  await getSession();

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
