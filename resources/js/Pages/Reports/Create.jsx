import { DropzoneButton } from '@/Components/Dropzone/DropzoneButton';
import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm } from '@inertiajs/react';
import {
  Button,
  Fieldset,
  Image,
  NativeSelect,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';
import { useEffect, useState } from 'react';

export default function Create({ auth, infrastructures }) {
  const { data, setData, post, processing, errors, setError, clearErrors } =
    useForm({
      title: '',
      description: '',
      infrastructure_id: '1',
      files: [],
      evidence_description: '',
    });

  const previews = data.files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
      />
    );
  });

  useEffect(() => {
    return () => data.files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  function submit(e) {
    e.preventDefault();
    clearErrors();
    post(route('reports.store'));
  }

  return (
    <>
      <Head title="Crear Reporte" />
      <Title order={1} mb={20}>
        Crear Reporte
      </Title>
      <Stack component="form" maw="66%" onSubmit={submit}>
        <TextInput
          label="Titulo"
          value={data.title}
          onChange={e => setData('title', e.target.value)}
          error={errors.title}
          required
        />
        <Textarea
          label="Descripción"
          value={data.description}
          onChange={e => setData('description', e.target.value)}
          error={errors.description}
          required
        />
        <NativeSelect
          label="Infraestructura"
          value={data.infrastructure_id}
          onChange={e => {
            console.log(e.currentTarget.value, e.target.value);
            setData('infrastructure_id', e.currentTarget.value);
          }}
          data={infrastructures}
          error={errors.infrastructure_id}
          required
        />
        <Fieldset legend="Subir evidencias *">
          <DropzoneButton setData={setData} setError={setError} />
          <SimpleGrid
            cols={{ base: 1, sm: 3 }}
            mt={previews.length > 0 ? 'xl' : 0}
          >
            {previews}
          </SimpleGrid>
          <Stack mt="xs">
            {Array.isArray(errors.files) ? (
              errors.files.map(file => (
                <Text c="red" key={file.path}>
                  El archivo {file.file.name} tiene los siguientes errores:{' '}
                  <ul>
                    {file.errors.map((error, index) => (
                      <li key={`error-${index}-${error.code}`}>
                        {error.message}
                      </li>
                    ))}
                  </ul>{' '}
                </Text>
              ))
            ) : (
              <Text c="red">{errors.files}</Text>
            )}
          </Stack>
        </Fieldset>
          <Textarea
            label="Descripción de la evidencia"
            value={data.evidence_description}
            onChange={e => setData('evidence_description', e.target.value)}
            error={errors.evidence_description}
          />
        <Button type="submit" disabled={processing}>
          Crear
        </Button>
      </Stack>
    </>
  );
}
