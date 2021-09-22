import { h } from 'preact';
import Icon from '@mui/material/Icon';
import Tab, { TabProps } from '@mui/material/Tab';

export function IconTab({
  icon,
  label,
  ...props
}: TabProps & {
  icon: string;
  label: string;
}) {
  return (
    <Tab
      label={
        <span>
          <Icon sx={{ fontSize: '1.25rem', margin: '-5px 5px -5px 0' }}>
            {icon}
          </Icon>
          {label}
        </span>
      }
      {...props}
    />
  );
}
