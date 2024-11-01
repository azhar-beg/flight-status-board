import React, { FC } from 'react';
import { Input, Label, Switch } from './ToggleSwitch.styles';

interface ToggleProps {
  toggle: () => void;
  checked: boolean;
}

enum Theme {
  Light = 'Light',
  Dark = 'Dark'
}

const ToggleSwitch: FC<ToggleProps> = ({ toggle, checked }) => {
  return (
    <Label>
      <span>{checked ? Theme.Dark : Theme.Light}</span>
      <Input checked={checked} type="checkbox" onChange={toggle} />
      <Switch />
    </Label>
  );
};

export default ToggleSwitch;
