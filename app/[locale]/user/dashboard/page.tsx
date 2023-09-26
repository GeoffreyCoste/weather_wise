import { PageLayout } from '@/components/PageLayout/PageLayout'
import { ButtonLogout } from '@/components/ButtonLogout/ButtonLogout'

export default function DashboardPage() {
  return (
    <PageLayout>
        User Dashboard
        <ButtonLogout />
    </PageLayout>
  )
}
