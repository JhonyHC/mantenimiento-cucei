import { DropzoneButton } from '@/Components/Dropzone/DropzoneButton';
import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import {
  Button,
  Fieldset,
  Image,
  NativeSelect,
  SimpleGrid,
  Stack,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';
import { useEffect, useState } from 'react';

export default function Create({ auth, infrastructures }) {
  const [files, setFiles] = useState([]);

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    console.log(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
      />
    );
  });

  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <>
      <Head title="Crear Reporte" />
      <Title order={1} mb={20}>
        Crear Reporte
      </Title>
      <Stack component="form" maw="66%">
        <TextInput label="Titulo" required />
        <Textarea label="Descripción" required />
        <NativeSelect label="Infraestructura" data={infrastructures} required />
        <Fieldset legend="Subir evidencias *">
          <DropzoneButton setFiles={setFiles} />
          <SimpleGrid
            cols={{ base: 1, sm: 3 }}
            mt={previews.length > 0 ? 'xl' : 0}
          >
            {previews}
          </SimpleGrid>
        </Fieldset>
        <Button>Crear</Button>
      </Stack>
    </>
  );
}
