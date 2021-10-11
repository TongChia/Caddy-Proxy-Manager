import { h } from 'preact';
import Icon from '@mui/material/Icon';
import Tab, { TabProps } from '@mui/material/Tab';
import { blueGrey } from '@mui/material/colors';

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
          <Icon
            className="material-icons-outlined"
            sx={{ fontSize: '1.1rem', margin: '-5px 5px -5px 0' }}
          >
            {icon}
          </Icon>
          {label}
        </span>
      }
      {...props}
    />
  );
}
