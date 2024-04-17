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

const data = [
  {
    link: '',
    roles: ['admin', 'mantenimiento', 'alumno'],
    label: 'Inicio',
    icon: IconHome,
  },
  {
    link: '',
    roles: ['admin', 'mantenimiento', 'alumno'],
    label: 'Reportes',
    icon: IconReport,
  },
  {
    link: '',
    roles: ['admin', 'mantenimiento'],
    label: 'Soluciones',
    icon: IconChecklist,
  },
  {
    link: '',
    roles: ['admin'],
    label: 'Infraestructuras',
    icon: IconBuilding,
  },
  //   { link: '', label: 'Databases', icon: IconDatabaseImport },
  //   { link: '', label: 'Authentication', icon: Icon2fa },
  //   { link: '', label: 'Other Settings', icon: IconSettings },
];

export function SimpleNavBar({ user }) {
  const [active, setActive] = useState('Inicio');

  const links = data.map(
    item =>
      item.roles.includes(user.role) && (
        <a
          className={classes.link}
          data-active={item.label === active || undefined}
          href={item.link}
          key={item.label}
          onClick={event => {
            event.preventDefault();
            setActive(item.label);
          }}
        >
          <item.icon className={classes.linkIcon} stroke={1.5} />
          <span>{item.label}</span>
        </a>
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
        <a
          href="#"
          className={classes.link}
          onClick={event => event.preventDefault()}
        >
          <IconUserCircle className={classes.linkIcon} stroke={1.5} />
          <span>Perfil</span>
        </a>

        <a
          href="#"
          className={classes.link}
          onClick={event => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Cerra sesión</span>
        </a>
      </div>
    </nav>
  );
}
