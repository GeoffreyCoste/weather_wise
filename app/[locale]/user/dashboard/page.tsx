'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { PageLayout } from '@/components/PageLayout/PageLayout'
import { ButtonLogout } from '@/components/ButtonLogout/ButtonLogout'

export default function DashboardPage() {

  const { data } = useSession();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <PageLayout>
        User Dashboard
        <ButtonLogout />
    </PageLayout>
  )
}
