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

export default function ReportCard({ report }) {
  const { auth } = usePage().props;
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

  return (
    <Box className="flex flex-col gap-5 border-2 border-black border-opacity-10 rounded-md p-3 shadow-lg ">
      <Group justify="space-between">
        <Group align="center">
          <Title order={2} size="h3">
            {report.title}
          </Title>
          <Badge color="red">{report.status_label}</Badge>
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
        <Group>
          {(auth.user.id === report.user.id || auth.user.role === 'admin') && (
            <>
              <ActionIcon color="cyan">
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
      <Text>
        {report.description.length > 100
          ? report.description.substring(0, 100) + '...'
          : report.description}
      </Text>
      <Group justify="space-between">
        <Group>
          <Text fw={700}>
            {' '}
            Creado por: <Mark color="cyan">Jonhatan jeje</Mark>
          </Text>
          <Text fw={700}>
            {' '}
            Atendido por: <Mark color="gray">Pendiente</Mark>
          </Text>
          <Text fw={700}>
            {' '}
            Ubicación: <Mark color="green">{report.infrastructure.name}</Mark>
          </Text>
        </Group>
        <Group>
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
          {/* <Button
            component={Link}
            href={route('reports.show', 1)}
            color="orange"
          >
            Agregar importancia
          </Button> */}
          <Button component={Link} href={route('reports.show', 1)}>
            Ver detalles
          </Button>
        </Group>
      </Group>
    </Box>
  );
}
