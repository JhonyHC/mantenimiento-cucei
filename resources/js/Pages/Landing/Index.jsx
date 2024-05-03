import { Container, Text, Button, Group } from '@mantine/core';
import classes from './Index.module.css';
import { Link } from '@inertiajs/react';

export default function Index() {
  return (
    <div className={classes.wrapper}>
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          Bienvenidos a{'  '}
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
            inherit
          >
            Reporta CUCEI
          </Text>{' '}
        </h1>
    <br/>
        <Text className={classes.description} color="dimmed">
          Una aplicación con el fin de mejorar la comunicación entre los alumnos
          y el equipo encargado del mantenimiento, para así poder reportar
          problemas de manera más eficiente.
        </Text>

        <Group className={classes.controls}>
          <Button
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
            component={Link}
            href={route('login')}
          >
            Iniciar sesión
          </Button>

          <Button
            href="https://github.com/mantinedev/mantine"
            size="xl"
            variant="default"
            className={classes.control}
            component={Link}
            href={route('register')}
          >
            Registrarse
          </Button>
        </Group>
      </Container>
    </div>
  );
}
