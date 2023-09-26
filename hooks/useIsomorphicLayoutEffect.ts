// This hook organize switching between useEffect and useLayoutEffect following the execution environment
// Due to the fact that useLayoutEffect is a browser hook doing nothing on the server.
// However, React could be generated from the server, without the Window API (e.g. while using Next.js)

import {useEffect, useLayoutEffect} from 'react';

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;