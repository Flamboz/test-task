import React from 'react';
import { ExpandButton } from './ExpandButton';
import { RemoveButton } from './RemoveButton';
import { SplitButton } from './SplitButton';

export const DEFAULT_CONTROLS_WITH_CREATION = React.Children.toArray([
  <SplitButton />,
  <ExpandButton />,
  <RemoveButton />,
]);
export const DEFAULT_CONTROLS_WITHOUT_CREATION = React.Children.toArray([<ExpandButton />, <RemoveButton />]);
