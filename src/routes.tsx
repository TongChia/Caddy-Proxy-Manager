import { h } from 'preact';
import { Dashboard } from './pages/Dashboard';
import { Hosts } from './pages/Host';

export const routes: WebRoutes = {
  dashboard: {
    icon: 'home',
    label: 'Dashboard',
    path: '/',
    page: () => <Dashboard />,
  },
  hosts: {
    icon: 'list',
    label: 'Hosts',
    path: '/hosts',
    page: () => <Hosts />,
  },
  access: {
    icon: 'lock_open',
    label: 'Access Lists',
    path: '/access',
    page: () => <h1>Users page !</h1>,
  },
  users: {
    icon: 'manage_accounts',
    label: 'Users',
    path: '/users',
    page: () => <h1>Users page !</h1>,
  },
  logs: {
    icon: 'description',
    label: 'Audit Log',
    path: '/logs',
    page: () => <h1>Audit Log page !</h1>,
  },
  settings: {
    icon: 'settings',
    label: 'Settings',
    path: '/settings',
    page: () => <h1>Settings page !</h1>,
  },
};
