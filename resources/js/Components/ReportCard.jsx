import ReportStatus from '@/Utils/ReportStatus';
import { Link, usePage } from '@inertiajs/react';
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
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function ReportCard({ report }) {
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
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque eos,
        officia iusto magnam placeat consequuntur ut recusandae, deserunt
        repellendus incidunt, soluta architecto nemo temporibus earum iure!
        Incidunt itaque atque quia?
      </p>
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
            Importancia: <Mark color="red">12</Mark>
          </Text>
        </Group>
        <Group>
          <Button
            component={Link}
            href={route('reports.show', 1)}
            color="orange"
          >
            Agregar importancia
          </Button>
          <Button component={Link} href={route('reports.show', 1)}>
            Ver detalles
          </Button>
        </Group>
      </Group>
    </Box>
  );
}
