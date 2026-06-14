import { Nav } from "@/components/marketing/Nav";
import { Footer } from "@/components/marketing/Footer";
import { TopContactBar } from "@/components/marketing/TopContactBar";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopContactBar />
      <Nav />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
