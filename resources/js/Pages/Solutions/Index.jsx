import ReportCard from '@/Components/ReportCard';
import { Head, Link } from '@inertiajs/react';
import { Button, Group, Stack, Title } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

export default function Dashboard({ auth, reports, can }) {
  console.log(reports);
  return (
    <>
      <Head title="Reportes" />
      <Title order={1} mb={20}>
        Soluciones
      </Title>
      <Group justify="end">
        {can.create && (
          <Button
            component={Link}
            href={route('reports.create')}
            justify="center"
            leftSection={<IconPlus size={20} />}
          >
            Crear solución
          </Button>
        )}
      </Group>
      <Stack spacing="md" my={30}>
        {reports.length === 0 ? (
          <p>Sin soluciones registradas</p>
        ) : (
          reports.map(report => {
            return <ReportCard key={report.id} report={report}></ReportCard>;
          })
        )}
        {/* <ReportCard></ReportCard> */}
      </Stack>
    </>
  );
}
