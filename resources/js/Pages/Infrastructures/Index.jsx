import ReportCard from '@/Components/ReportCard';
import { TableScroll } from '@/Components/TableScroll/TableScroll';
import { Head, Link } from '@inertiajs/react';
import { Button, Group, Stack, Title } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

export default function Dashboard({ auth, infrastructures }) {
  console.log(infrastructures);
  return (
    <>
      <Head title="Reportes" />
      <Title order={1} mb={20}>
        Infraestructuras
      </Title>
      <Group justify="end">
        <Button
          component={Link}
          href={route('infrastructures.create')}
          justify="center"
          leftSection={<IconPlus size={20} />}
        >
          Crear
        </Button>
      </Group>
      <Stack spacing="md" my={30}>
        {infrastructures.length === 0 ? (
          <p>Sin infraestructuras</p>
        ) : (
          <TableScroll data={infrastructures} />
        )}
        {/* <ReportCard></ReportCard> */}
      </Stack>
    </>
  );
}
