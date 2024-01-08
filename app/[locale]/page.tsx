import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { PageLayout } from '@/components/PageLayout/PageLayout'
import { HomePageContent } from '@/components/HomePageContent/HomePageContent'

const HomePage = async () => {
  
  const {user} = await getServerSession() || {};
  
  if (user) {
    redirect('/user/dashboard');
  }

  return (
    <PageLayout>
        <HomePageContent />
    </PageLayout>
  );
};

export default HomePage;