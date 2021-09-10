import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Icon, Tab } from '@material-ui/core';
import { h } from 'preact';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      fontSize: '1.25rem',
      margin: '-5px 5px -5px 0',
    },
  }),
);

export function IconTab({
  icon,
  label,
  ...props
}: {
  icon: string;
  label: string;
}) {
  const classes = useStyles();
  return (
    <Tab
      label={
        <span>
          <Icon className={classes.icon}>{icon}</Icon>
          {label}
        </span>
      }
      {...props}
    />
  );
}
