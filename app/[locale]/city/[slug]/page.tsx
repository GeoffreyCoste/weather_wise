import { PageLayout } from '@/components/PageLayout/PageLayout';
import { CityPageContent } from '@/components/CityPageContent/CityPageContent';

export default function CityPage({params}: {params: {slug: string}}) {

  const splitSlug = params.slug.split('-');
  const cityId = splitSlug[splitSlug.length - 1];

  return (
    <PageLayout>
        <CityPageContent cityId={cityId} />
    </PageLayout>
  );
}