import { Head, useForm } from '@inertiajs/react';
import { Button, Stack, TextInput, Textarea, Title } from '@mantine/core';
import { useEffect, useState } from 'react';

export default function Create({ infrastructure }) {
  console.log(infrastructure);
  const { data, setData, post, processing, errors, clearErrors, put } = useForm(
    {
      name: infrastructure?.name || '',
      description: infrastructure?.description || '',
    }
  );

  function submit(e) {
    e.preventDefault();
    clearErrors();
    if (infrastructure) {
      put(route('infrastructures.update', infrastructure.id));
    } else {
      post(route('infrastructures.store'));
    }
  }

  return (
    <>
      <Head
        title={(infrastructure ? 'Editar' : 'Crear') + ' Infraestructura'}
      />
      <Title order={1} mb={20}>
        {infrastructure ? 'Editar' : 'Crear'} Infraestructura
      </Title>
      <Stack component="form" maw="66%" onSubmit={submit}>
        <TextInput
          label="Nombre"
          value={data.name}
          onChange={e => setData('name', e.target.value)}
          error={errors.name}
          required
        />
        <Textarea
          label="Descripción"
          value={data.description}
          onChange={e => setData('description', e.target.value)}
          error={errors.description}
          required
        />

        <Button type="submit" disabled={processing}>
          Crear
        </Button>
      </Stack>
    </>
  );
}
