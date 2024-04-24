import ReportCard from '@/Components/ReportCard';
import { TableScroll } from '@/Components/TableScroll/TableScroll';
import { Head, Link } from '@inertiajs/react';
import { ActionIcon, Button, Group, Stack, Table, Title } from '@mantine/core';
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';

export default function Dashboard({ auth, users }) {
  console.log(users);
  return (
    <>
      <Head title="Usuarios" />
      <Title order={1} mb={20}>
        Usuarios del sistema
      </Title>
      <Group justify="end">
        <Button
          component={Link}
          href={route('users.create')}
          justify="center"
          leftSection={<IconPlus size={20} />}
        >
          Crear
        </Button>
      </Group>
      <Stack spacing="md" my={30}>
        {users.length === 0 ? (
          <p>Sin usuarios</p>
        ) : (
          <TableScroll
            tableHeader={
              <Table.Tr>
                <Table.Th>Nombre</Table.Th>
                <Table.Th>Correo</Table.Th>
                <Table.Th>Código</Table.Th>
                <Table.Th>Options</Table.Th>
              </Table.Tr>
            }
          >
            {users.map(row => (
              <Table.Tr key={row.id}>
                <Table.Td>{row.name}</Table.Td>
                <Table.Td>{row.email}</Table.Td>
                <Table.Td>{row.code}</Table.Td>
                <Table.Td>
                  {row.id !== 1 && (
                    <Group>
                      <ActionIcon
                        component={Link}
                        href={route('users.edit', row.id)}
                        color="cyan"
                      >
                        <IconPencil size={20} />
                      </ActionIcon>
                      <ActionIcon
                        component={Link}
                        as="button"
                        href={route('users.destroy', row.id)}
                        method="delete"
                        color="red"
                      >
                        <IconTrash size={20} />
                      </ActionIcon>
                    </Group>
                  )}
                </Table.Td>
              </Table.Tr>
            ))}
          </TableScroll>
        )}
        {/* <ReportCard></ReportCard> */}
      </Stack>
    </>
  );
}
