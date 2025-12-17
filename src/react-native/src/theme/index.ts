// WhiteLight - Theme Barrel Export

export * from './colors';
export * from './spacing';
export * from './typography';

import { colors } from './colors';
import { spacing, borderRadius, iconSizes, hitSlop } from './spacing';
import { typography, fontSizes, fontWeights, lineHeights } from './typography';

export const theme = {
  colors,
  spacing,
  borderRadius,
  iconSizes,
  hitSlop,
  typography,
  fontSizes,
  fontWeights,
  lineHeights,
};

export type Theme = typeof theme;
