'use client';

import { useMemo, useEffect, createContext } from 'react';
import { init, track } from '@amplitude/analytics-browser';

export interface AmplitudeContextValue {
  trackAmplitudeEvent: (
    eventName: string,
    eventProperties?: Record<string, unknown>,
  ) => void;
}

export const AmplitudeContext = createContext<AmplitudeContextValue>({
  trackAmplitudeEvent: () => {},
});

interface AmplitudeContextProviderProps {
  children: React.ReactNode;
  userId: string;
}

function AmplitudeContextProvider({
  userId,
  children,
}: AmplitudeContextProviderProps) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') return;

    init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY as string, userId, {
      defaultTracking: {
        sessions: true,
      },
    });
    console.log('amplitude watching...');
  }, [userId]);

  const trackAmplitudeEvent = (
    eventName: string,
    eventProperties: Record<string, unknown> | undefined,
  ) => {
    track(eventName, eventProperties);
  };

  const value = useMemo(() => ({ trackAmplitudeEvent }), []);

  return <AmplitudeContext value={value}>{children}</AmplitudeContext>;
}

export default AmplitudeContextProvider;
