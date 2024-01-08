import clsx from 'clsx'
import {Raleway} from 'next/font/google'
import {createTranslator, NextIntlClientProvider} from 'next-intl'
import {ReactNode} from 'react'
import { Header } from '@/components/Header/Header'
import {cookies} from 'next/headers'
import {ThemeProvider} from '@/context/themeContext'
import {TemperatureProvider} from '@/context/temperatureContext'
import { WindspeedProvider } from '@/context/windspeedContext'
import { ModalProvider } from '@/context/modalContext'
import { Modal } from '@/components/ModalPortal/Modal/Modal'
import { Footer } from '@/components/Footer/Footer'
import { AuthProvider } from '@/components/AuthProvider/AuthProvider'
import { EdgeStoreProvider } from '@/lib/edgestore'

const raleway = Raleway({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin']
});

type Props = {
  children: ReactNode;
  params: {locale: string};
};

async function getMessages(locale: string) {
  try {
    return (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    console.log(error);
  }
}

export async function generateStaticParams() {
  return ['fr', 'en'].map((locale) => ({locale}));
}

export async function generateMetadata({params: {locale}}: Props) {
  const messages = await getMessages(locale);

  // You can use the core (non-React) APIs when you have to use next-intl
  // outside of components. Potentially this will be simplified in the future
  // (see https://next-intl-docs.vercel.app/docs/next-13/server-components).
  const t = createTranslator({locale, messages});
  return {
    title: {
      default: t('LocaleLayout.default_title')
    }
  };
}

export default async function LocaleLayout({
  children,
  params: {locale}
}: Props) {
  const messages = await getMessages(locale);

  const cookieStore = cookies();
  const themeCookie = cookieStore.get('theme')?.value ?? '' // Setting value of const 'themeCookie' to '' if there is no cookie 'theme' inside 'cookieStore'
  const temperatureCookie = cookieStore.get('temperature')?.value ?? ''

  return (
    <html lang={locale}>
      <body className={clsx(raleway.className, 'bg-sky-100 dark:bg-[#0F1A3E]')}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <ModalProvider>
              <TemperatureProvider>
                <WindspeedProvider>
                  <AuthProvider>
                    <EdgeStoreProvider>
                        <Header themeCookie={themeCookie} temperatureCookie={temperatureCookie} />
                        {children}
                        <Footer />
                        <Modal />
                    </EdgeStoreProvider>
                  </AuthProvider>
                </WindspeedProvider>
              </TemperatureProvider>
            </ModalProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}