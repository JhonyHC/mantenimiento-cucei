import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import { Button, NativeSelect, Stack, TextInput, Title } from '@mantine/core';

export default function Create({ auth, infrastructures }) {
  return (
    <>
      <Head title="Crear Reporte" />
      <Title order={1} mb={20}>
        Crear Reporte
      </Title>
      <Stack component="form" maw="50%">
        <TextInput label="Titulo" />
        <TextInput label="Descripción" />
        <NativeSelect label="Infraestructura" data={infrastructures} />
        <Button>Crear</Button>
      </Stack>
    </>
  );
}
