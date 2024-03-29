import { h } from 'preact';
import { Dashboard } from './pages/Dashboard';
import { Hosts } from './pages/Hosts';
import { Certificates } from './pages/Certificates';
import { Users } from './pages/Users';
import { AccessList } from './pages/AccessList';
import { Settings } from './pages/Settings';

export const routes: WebRoutes = {
  dashboard: {
    icon: 'home',
    label: 'Dashboard',
    path: '/',
    page: Dashboard,
  },
  hosts: {
    icon: 'dns',
    label: 'Hosts',
    path: '/hosts',
    page: Hosts,
  },
  access: {
    icon: 'lock_open',
    label: 'Access Lists',
    path: '/access',
    page: AccessList,
  },
  certs: {
    icon: 'shield',
    label: 'SSL Certificates',
    path: '/certificates',
    page: Certificates,
  },
  users: {
    icon: 'manage_accounts',
    label: 'Users',
    path: '/users',
    page: Users,
  },
  // logs: {
  //   icon: 'description',
  //   label: 'Audit Log',
  //   path: '/logs',
  //   page: () => <h1>Audit Log page !</h1>,
  // },
  settings: {
    icon: 'settings',
    label: 'Settings',
    path: '/settings',
    page: Settings,
  },
};
