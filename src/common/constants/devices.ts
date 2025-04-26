import { devices, ViewportSize } from '@playwright/test';

interface Device {
  name: string;
  viewport: ViewportSize;
}

export const MOBILE_DEVICES: Record<string, Device> = {
  pixel5: {
    name: 'Pixel 5',
    viewport: devices['Pixel 5'].viewport,
  },
  iPhone13ProMax: {
    name: 'iPhone 13 Pro Max',
    viewport: devices['iPhone 13 Pro Max'].viewport,
  },
};
