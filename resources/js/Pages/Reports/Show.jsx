import { CardsCarousel } from '@/Components/CardsCarousel/CardsCarousel';
import CommentsSection from '@/Components/CommentsSection';
import ReportStatus from '@/Utils/ReportStatus';
import { Head, Link, router } from '@inertiajs/react';
import {
  ActionIcon,
  Badge,
  Button,
  Group,
  Mark,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { IconPencil, IconTrash, IconUrgent } from '@tabler/icons-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from 'react';

dayjs.extend(relativeTime);
export default function Show({ auth, report, can }) {
  const [addingImportance, setAddingImportance] = useState(false);
  const handleAddImportance = () => {
    router.visit(route('reports.importance', report.id), {
      method: 'post',
      onStart: visit => {
        setAddingImportance(true);
      },
      onFinish: visit => {
        setAddingImportance(false);
      },
      preserveScroll: true,
    });
  };
  console.log(report);

  return (
    <>
      <Head title="Crear Reporte" />
      <Stack gap={20} mt={30}>
        <Group justify="space-between">
          <Group align="center">
            <Title order={1}>{report.title}</Title>
            <Badge color="red">
              {ReportStatus.getDescriptions(report.status)}
            </Badge>
            <Tooltip
              label={`Fecha creacion: ${dayjs(report.created_at).format('D/MM/YY HH:mm a')}`}
              color="cyan"
              withArrow
            >
              <Text c="dimmed" size="sm">
                {dayjs(report.created_at).fromNow()}
              </Text>
            </Tooltip>
          </Group>
          <Group justify="space-between">
            <Group>
              {(auth.user.id === report.user.id ||
                auth.user.role === 'admin') && (
                <>
                  <ActionIcon
                    component={Link}
                    href={route('reports.edit', report.id)}
                    color="cyan"
                  >
                    <IconPencil size={20} />
                  </ActionIcon>
                  <ActionIcon
                    component={Link}
                    as="button"
                    href={route('reports.destroy', report.id)}
                    method="delete"
                    color="red"
                  >
                    <IconTrash size={20} />
                  </ActionIcon>
                </>
              )}
            </Group>
          </Group>
        </Group>
        <Group justify="space-between">
          <Group>
            <Text fw={700}>
              {' '}
              Creado por: <Mark color="cyan">{report.user.name}</Mark>
            </Text>
            <Text fw={700}>
              {' '}
              Atendido por:{' '}
              <Mark color="gray">{report.solver?.name ?? 'Pendiente'}</Mark>
            </Text>
            <Text fw={700}>
              {' '}
              Ubicación: <Mark color="green">{report.infrastructure.name}</Mark>
            </Text>
          </Group>
          <Group>
            {can.toggleImportance && (
              <Tooltip
                label={
                  report.importance_added
                    ? 'Quitar importancia'
                    : 'Agregar importancia'
                }
                color="red"
              >
                <Button
                  variant="subtle"
                  color="red"
                  loading={addingImportance}
                  leftSection={
                    <IconUrgent
                      stroke={report.importance_added ? 2 : 1}
                      size={20}
                    />
                  }
                  onClick={() => handleAddImportance()}
                  gap="2px"
                  align="center"
                >
                  <Text>{report.importance}</Text>
                </Button>
              </Tooltip>
            )}
          </Group>
        </Group>
        {can.assignSolver && (
          <Button
            component={Link}
            href={route('reports.update', report.id)}
            as="button"
            method="patch"
            data={{
              solver_id:
                report.solver_id === auth.user.id ? null : auth.user.id,
            }}
            color={report.solver_id === auth.user.id ? 'red' : 'blue'}
          >
            {report.solver_id === auth.user.id ? 'Desasignarse' : 'Asignarse'}{' '}
            para arreglar el problema
          </Button>
        )}
        <div>
          <Title order={2} size="h3">
            Descripción
          </Title>
          <Text>{report.description}</Text>
        </div>
        <div className="max-w-screen-lg">
          <Title order={2} size="h3">
            Evidencia{' '}
            <Text component="span" size="xl" c="dimmed">
              ({report.evidences.length})
            </Text>
          </Title>
          <CardsCarousel data={report.evidences} />
          {report.evidence_description && (
            <Text my={10}>
              <Mark color="blue">Descripción de la evidencia: </Mark>
              {report.evidence_description}
            </Text>
          )}
        </div>
        <CommentsSection report={report} />
      </Stack>
    </>
  );
}
