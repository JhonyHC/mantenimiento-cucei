import ReportCard from '@/Components/ReportCard';
import SolutionCard from '@/Components/SolutionCard';
import { Head, Link } from '@inertiajs/react';
import { Button, Group, Stack, Title } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

export default function History({ auth, reports }) {
  console.log(reports);
  return (
    <>
      <Head title="Reportes" />
      <Title order={1} mb={20}>
        Historial / Consulta
      </Title>
      <Stack spacing="md" my={30}>
        {reports.length === 0 ? (
          <p>No hay nada que mostrar</p>
        ) : (
          reports.map(report => {
            return (
              <SolutionCard
                key={report.id}
                report={report}
                viewOnly
              ></SolutionCard>
            );
          })
        )}
        {/* <ReportCard></ReportCard> */}
      </Stack>
    </>
  );
}
