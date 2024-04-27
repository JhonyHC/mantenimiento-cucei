import { DropzoneButton } from '@/Components/Dropzone/DropzoneButton';
import AppLayout from '@/Layouts/AppLayout';
import { Head, router, useForm } from '@inertiajs/react';
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
import { useEffect, useRef, useState } from 'react';

export default function Edit({ report, infrastructures, solvers, auth }) {
  const allSolvers = [{ value: '', label: 'Sin asignar' }, ...solvers];
  console.log({ report, infrastructures, solvers });
  const { data, setData, processing, errors, setError, clearErrors } = useForm(
    () => {
      const editInfo = {
        title: report.title,
        description: report.description,
        infrastructure_id: report.infrastructure_id,
        files: [],
        evidence_description: report.evidence_description || '',
      };
      if (auth.user.role === 'admin') {
        editInfo.solver_id = report.solver_id || '';
      }

      return editInfo;
    }
  );

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

  const currentEvidence = report.evidences.map(evidence => {
    return <Image key={evidence.id} src={'/storage/' + evidence.path} />;
  });

  useEffect(() => {
    return () => data.files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  function submit(e) {
    e.preventDefault();
    clearErrors();
    router.post(route('reports.update', report.id), {
      _method: 'patch',
      ...data,
    });
  }

  return (
    <>
      <Head title="Editar Reporte" />
      <Title order={1} mb={20}>
        Editar Reporte
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
        <Fieldset legend="  ">
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
        <Textarea
          label="Descripción de la evidencia"
          value={data.evidence_description}
          onChange={e => setData('evidence_description', e.target.value)}
          error={errors.evidence_description}
        />
        {auth.user.role === 'admin' && (
          <NativeSelect
            label="Cambiar encargado"
            value={data.solver_id}
            onChange={e => {
              setData('solver_id', e.currentTarget.value);
            }}
            data={allSolvers}
            error={errors.solver_id}
          />
        )}
        <Button type="submit" disabled={processing}>
          Editar
        </Button>
      </Stack>
    </>
  );
}
