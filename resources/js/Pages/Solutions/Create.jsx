import { DropzoneButton } from '@/Components/Dropzone/DropzoneButton';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, useForm } from '@inertiajs/react';
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
import { DateTimePicker } from '@mantine/dates';
import { useEffect, useState } from 'react';

export default function Create({ auth, reports }) {
  console.log(reports);
  const { data, setData, post, processing, errors, setError, clearErrors } =
    useForm({
      description: '',
      report_id: reports[0]?.value || 0,
      solved_at: '',
      files: [],
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
    post(route('solutions.store'));
  }

  return (
    <>
      <Head title="Crear Solución" />
      <Title order={1} mb={20}>
        Crear Solución
      </Title>
      <Stack component="form" maw="66%" onSubmit={submit}>
        <Textarea
          label="Descripción"
          value={data.description}
          placeholder="Descripción de la solución del problema y de la evidencia"
          onChange={e => setData('description', e.target.value)}
          error={errors.description}
          required
        />
        <NativeSelect
          label="Reporte"
          value={data.report_id}
          onChange={e => {
            setData('report_id', e.currentTarget.value);
          }}
          data={reports}
          error={errors.report_id}
          required
        />
        {data.report_id !== 0 ? (
          <Button
            component={Link}
            href={route('reports.show', data.report_id)}
            color="cyan"
          >
            Ver reporte seleccionado
          </Button>
        ) : (
          <Text
            c="red"
            td="underline"
            component={Link}
            href={route('reports.index')}
          >
            No eres encargado de ningún reporte, ve a reportes y asignate uno
          </Text>
        )}
        <Fieldset legend="Subir evidencias de solución *">
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
        <DateTimePicker
          label="Fecha de solución"
          placeholder="Fecha de solución"
          value={data.solved_at}
          onChange={value => setData('solved_at', value)}
        />
        <Text c="red">{errors.solved_at}</Text>
        <Button type="submit" disabled={processing}>
          Crear
        </Button>
      </Stack>
    </>
  );
}
