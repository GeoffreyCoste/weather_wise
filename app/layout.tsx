import './globals.css';
/* import {Metadata} from 'next'; */
import {PropsWithChildren} from 'react';

/* export const metadata: Metadata = {
  title: 'Weather Wise',
  description: 'Weather forecast app'
}; */


// Since there is a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({children}: PropsWithChildren) {
  return children;
}
