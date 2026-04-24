import Header from '@/components/Header'
import AdminGuard from '@/components/AdminGuard'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <Header />
      {children}
    </AdminGuard>
  )
}
