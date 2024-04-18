import { Link } from '@inertiajs/react';
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

export default function ReportCard({ report }) {
  return (
    <Box className="flex flex-col gap-5 border-2 border-black border-opacity-10 rounded-md p-3 shadow-lg ">
      <Group justify="space-between">
        <Group align="center">
          <Title order={2} size="h3">
            Nombre Reporte
          </Title>
          <Badge color="red">Pendiente</Badge>
          <Tooltip label="Fecha creacion" color="cyan" withArrow>
            <Text c="dimmed" size="sm">
              Hace 43 minutos
            </Text>
          </Tooltip>
        </Group>
        <Group>
          <ActionIcon color="cyan">
            <IconPencil size={20} />
          </ActionIcon>
          <ActionIcon color="red">
            <IconTrash size={20} />
          </ActionIcon>
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
