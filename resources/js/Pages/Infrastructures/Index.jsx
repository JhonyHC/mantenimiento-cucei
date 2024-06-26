import ReportCard from '@/Components/ReportCard';
import { TableScroll } from '@/Components/TableScroll/TableScroll';
import { Head, Link } from '@inertiajs/react';
import { ActionIcon, Button, Group, Stack, Table, Title } from '@mantine/core';
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';

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
          <TableScroll
            tableHeader={
              <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Description</Table.Th>
                <Table.Th>Options</Table.Th>
              </Table.Tr>
            }
          >
            {infrastructures.map(row => (
              <Table.Tr key={row.id}>
                <Table.Td>{row.name}</Table.Td>
                <Table.Td>{row.description}</Table.Td>
                <Table.Td>
                  {row.id !== 1 && (
                    <Group>
                      <ActionIcon
                        component={Link}
                        href={route('infrastructures.edit', row.id)}
                        color="cyan"
                      >
                        <IconPencil size={20} />
                      </ActionIcon>
                      <ActionIcon
                        component={Link}
                        as="button"
                        href={route('infrastructures.destroy', row.id)}
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
