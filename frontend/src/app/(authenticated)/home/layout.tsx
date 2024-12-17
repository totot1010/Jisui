import { AllPostSideNav } from "@/feature/posts/components/AllPostSideNav";

export default async function Layout({ children }: { children: React.ReactNode }) {

  return (
    <div className="container mx-auto p-4">
      <div className="flex">
        <AllPostSideNav />
        {children}
      </div>
    </div>
  )
}