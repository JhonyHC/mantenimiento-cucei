import { DropzoneButton } from '@/Components/Dropzone/DropzoneButton';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import {
  Button,
  Fieldset,
  Image,
  Mark,
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

export default function Edit({ auth, solution }) {
  console.log(solution);
  const { data, setData, processing, errors, setError, clearErrors } = useForm({
    description: solution.description,
    report_id: solution.report_id,
    solved_at: solution.solved_at,
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

  const currentEvidence = solution.evidences.map(evidence => {
    return <Image key={evidence.id} src={'/storage/' + evidence.path} />;
  });

  function submit(e) {
    e.preventDefault();
    clearErrors();
    router.post(route('solutions.update', solution.id), {
      _method: 'patch',
      ...data,
    });
  }

  return (
    <>
      <Head title="Editar Solución" />
      <Title order={1} mb={20}>
        Editar Solución
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
        <Text size="xl">
          Solución al reporte: <Mark color="cyan">{solution.report.title}</Mark>
        </Text>
        <Button
          component={Link}
          href={route('reports.show', data.report_id)}
          color="cyan"
        >
          Ver reporte seleccionado
        </Button>

        <Fieldset legend="Subir evidencias * (Las nuevas evidencias reemplazaran a las anteriores)">
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
          <Title order={3} size="h4" mt="xl" mb={0}>
            Evidencia actual:
          </Title>
          <SimpleGrid cols={{ base: 1, sm: 3 }}>{currentEvidence}</SimpleGrid>
        </Fieldset>
        <DateTimePicker
          label="Fecha de solución"
          placeholder="Fecha de solución"
          value={new Date(data.solved_at)}
          onChange={value => setData('solved_at', value)}
        />
        <Text c="red">{errors.solved_at}</Text>
        <Button type="submit" disabled={processing}>
          Editar Solución
        </Button>
      </Stack>
    </>
  );
}
