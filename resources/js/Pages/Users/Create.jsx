import { Head, useForm } from '@inertiajs/react';
import {
  Button,
  PasswordInput,
  Stack,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';
import { useEffect, useState } from 'react';

export default function Create() {
  const { data, setData, post, processing, errors, clearErrors } = useForm({
    name: '',
    email: '',
    code: '',
    password: '',
  });

  function submit(e) {
    e.preventDefault();
    clearErrors();
    post(route('users.store'));
  }

  return (
    <>
      <Head title="Crear Usuario" />
      <Title order={1} mb={20}>
        Crear Usuario
      </Title>
      <Stack component="form" maw="66%" onSubmit={submit}>
        <TextInput
          label="Nombre"
          value={data.name}
          onChange={e => setData('name', e.target.value)}
          error={errors.name}
          required
        />
        <TextInput
          label="Correo"
          type="email"
          value={data.email}
          onChange={e => setData('email', e.target.value)}
          error={errors.email}
          required
        />
        <TextInput
          label="Código"
          value={data.code}
          onChange={e => setData('email', e.target.value)}
          error={errors.code}
          required
        />
        <PasswordInput
          label="Contraseña"
          value={data.password}
          onChange={e => setData('password', e.target.value)}
          error={errors.password}
          required
        />

        <Button type="submit" disabled={processing}>
          Crear
        </Button>
      </Stack>
    </>
  );
}
