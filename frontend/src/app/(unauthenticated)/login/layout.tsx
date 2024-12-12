export default async function Layout({ children }: { children: React.ReactNode }) {

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
        {children}
    </div>
  )
}