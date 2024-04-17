import { useState } from 'react';
import { Group, Code } from '@mantine/core';
import {
  IconLogout,
  IconUserCircle,
  IconHome,
  IconReport,
  IconChecklist,
  IconBuilding,
} from '@tabler/icons-react';
import classes from './SimpleNavBar.module.css';
import ApplicationLogo from '../ApplicationLogo';
import { Link } from '@inertiajs/react';

const data = [
  {
    link: route('dashboard'),
    roles: ['admin', 'mantenimiento', 'alumno'],
    label: 'Inicio',
    icon: IconHome,
  },
  {
    link: route('reports.index'),
    roles: ['admin', 'mantenimiento', 'alumno'],
    label: 'Reportes',
    icon: IconReport,
  },
  {
    link: route('solutions.index'),
    roles: ['admin', 'mantenimiento'],
    label: 'Soluciones',
    icon: IconChecklist,
  },
  {
    link: route('infrastructures.index'),
    roles: ['admin'],
    label: 'Infraestructuras',
    icon: IconBuilding,
  },
  //   { link: '', label: 'Databases', icon: IconDatabaseImport },
  //   { link: '', label: 'Authentication', icon: Icon2fa },
  //   { link: '', label: 'Other Settings', icon: IconSettings },
];

export function SimpleNavBar({ user, currentPageUrl }) {
  const links = data.map(
    item =>
      item.roles.includes(user.role) && (
        <Link
          className={classes.link}
          data-active={
            new URL(item.link).pathname === currentPageUrl || undefined
          }
          href={item.link}
          key={item.label}
        >
          <item.icon className={classes.linkIcon} stroke={1.5} />
          <span>{item.label}</span>
        </Link>
      )
  );

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <ApplicationLogo />
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <Link
          href={route('profile.edit')}
          className={classes.link}
          data-active={'/profile' === currentPageUrl || undefined}
        >
          <IconUserCircle className={classes.linkIcon} stroke={1.5} />
          <span>Perfil</span>
        </Link>

        <Link
          as="button"
          href={route('logout')}
          method="post"
          className={classes.link + ' w-full'}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Cerra sesión</span>
        </Link>
      </div>
    </nav>
  );
}
