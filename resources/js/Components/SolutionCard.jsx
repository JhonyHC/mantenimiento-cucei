import ReportStatus from '@/Utils/ReportStatus';
import { Link, router, usePage } from '@inertiajs/react';
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Group,
  Mark,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import {
  IconPencil,
  IconPlus,
  IconTrash,
  IconUrgent,
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from 'react';

dayjs.extend(relativeTime);

export default function SolutionCard({ report }) {
  const { auth } = usePage().props;

  return (
    <Box className="flex flex-col gap-5 border-2 border-black border-opacity-10 rounded-md p-3 shadow-lg ">
      <Group justify="space-between">
        <Group align="center">
          <Title order={2} size="h3">
            {report.title}
          </Title>
          <Badge color="red">{report.status_label}</Badge>
          <Tooltip
            label={`Resuelto el : ${dayjs(report.solved_at).format('D/MM/YY HH:mm a')}`}
            color="cyan"
            withArrow
          >
            <Text c="dimmed" size="sm">
              {dayjs(report.solved_at).fromNow()}
            </Text>
          </Tooltip>
        </Group>
        <Group>
          {(auth.user.id === report.solver.id ||
            auth.user.role === 'admin') && (
            <>
              <ActionIcon
                component={Link}
                href={route('solutions.edit', report.solution.id)}
                color="cyan"
              >
                <IconPencil size={20} />
              </ActionIcon>
              <ActionIcon
                component={Link}
                as="button"
                href={route('solutions.destroy', report.solution.id)}
                method="delete"
                color="red"
              >
                <IconTrash size={20} />
              </ActionIcon>
            </>
          )}
        </Group>
      </Group>
      <Text>
        <Mark color="cyan">Descripción de la solución:</Mark>{' '}
        {report.solution.description.length > 100
          ? report.solution.description.substring(0, 100) + '...'
          : report.solution.description}
      </Text>
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
          {/* <Button
            component={Link}
            href={route('reports.show', 1)}
            color="orange"
          >
            Agregar importancia
          </Button> */}
          <Button
            component={Link}
            href={route('solutions.show', report.solution.id)}
          >
            Ver detalles
          </Button>
        </Group>
      </Group>
    </Box>
  );
}
