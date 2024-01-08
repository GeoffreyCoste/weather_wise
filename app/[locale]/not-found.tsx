import { NotFoundMessage } from "@/components/NotFoundMessage/NotFoundMessage"
import { PageLayout } from "@/components/PageLayout/PageLayout"

export default function NotFound () {
    return (
        <PageLayout>
            <div
              className="w-full flex justify-center items-center rounded-lg p-8 sm:w-10/12 md:w-3/4 lg:w-3/4 2xl:w-3/5 bg-white dark:bg-blue-950"
            >
              <NotFoundMessage />
            </div>
        </PageLayout>
    )
}