import { CardsCarousel } from '@/Components/CardsCarousel/CardsCarousel';
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
export default function Show({ auth, solution, can }) {
  const report = solution.report;
  console.log({ solution, report });

  return (
    <>
      <Head title="Ver Reporte" />
      <Stack gap={20} mt={30}>
        <Group justify="space-between">
          <Group align="center">
            <Title
              component={Link}
              href={route('reports.show', report.id)}
              order={1}
            >
              {report.title}
            </Title>
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
              {can.update && (
                <>
                  <ActionIcon
                    component={Link}
                    href={route('solutions.edit', solution.id)}
                    color="cyan"
                  >
                    <IconPencil size={20} />
                  </ActionIcon>
                  <ActionIcon
                    component={Link}
                    as="button"
                    href={route('solutions.destroy', solution.id)}
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
        </Group>
        <Title order={2} size="h2">
          Detalles del Reporte
        </Title>
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
            <Text>{report.evidence_description}</Text>
          )}
        </div>
        <Title order={2} size="h2">
          Detalles de la Solución
        </Title>
        <div>
          <Title order={2} size="h3">
            Descripción
          </Title>
          <Text>{solution.description}</Text>
        </div>
        <div className="max-w-screen-lg">
          <Title order={2} size="h3">
            Evidencia{' '}
            <Text component="span" size="xl" c="dimmed">
              ({solution.evidences.length})
            </Text>
          </Title>
          <CardsCarousel data={solution.evidences} />
        </div>
        {auth.user.role === 'admin' &&
          report.status === ReportStatus.SOLVED && (
            <Tooltip
              label="Cierra el reporte cuando hayas comprobado que el problema haya sido solucionado"
              withArrow
              color="cyan"
            >
              <Button
                component={Link}
                href={route('reports.update', report.id)}
                color="blue"
                size="lg"
                as="button"
                method="patch"
                data={{ status: ReportStatus.CLOSED }}
              >
                Cerrar Reporte
              </Button>
            </Tooltip>
          )}
      </Stack>
    </>
  );
}
