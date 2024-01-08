import { PropsWithChildren } from 'react'
import { PageLayout } from '@/components/PageLayout/PageLayout'
import Navbar from '@/components/UserConfig/Navbar/Navbar';

export const UserProfileLayout = ({children}: PropsWithChildren) => {

  return (
    <PageLayout>
      <div
        className="relative w-full flex flex-col lg:flex-row rounded-lg py-4 px-4 sm:w-10/12 md:w-3/4 lg:w-3/4 2xl:w-3/5 bg-white dark:bg-blue-950 border-solid border-t-8 border-yellow-400"
      >
        <div className="basis-full lg:basis-1/4 py-4">
          <Navbar />
        </div>
        {children}
      </div>
    </PageLayout>
  )
};

export default UserProfileLayout;