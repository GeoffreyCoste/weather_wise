import { PropsWithChildren } from 'react'
import { PageLayout } from '@/components/PageLayout/PageLayout'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'

export const DashboardLayout = ({children}: PropsWithChildren) => {

  return (
    <PageLayout>
      <div
        className="relative w-full rounded-lg pt-2 px-4 sm:w-10/12 md:w-3/4 lg:w-3/4 2xl:w-3/5 bg-white dark:bg-blue-950 border-solid border-t-8 border-yellow-400"
      >
        <Breadcrumb />
        {children}
      </div>
    </PageLayout>
  )
};

export default DashboardLayout;
