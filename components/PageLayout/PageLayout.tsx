import { PropsWithChildren } from "react"

export const PageLayout = ({children}: PropsWithChildren) => {
  return (
    <main className="relative flex h-full w-full flex-wrap justify-center px-4 pt-20 md:px-0 md:pt-32">{children}</main>
  )
}
