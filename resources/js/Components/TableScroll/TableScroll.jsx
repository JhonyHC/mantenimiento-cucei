import cx from 'clsx';
import { useState } from 'react';
import { Table, ScrollArea, Group, ActionIcon } from '@mantine/core';
import classes from './TableScroll.module.css';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { Link } from '@inertiajs/react';

export function TableScroll({ data }) {
  const [scrolled, setScrolled] = useState(false);

  const rows = data.map(row => (
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
  ));

  return (
    <ScrollArea
      h={300}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table miw={700} striped>
        <Table.Thead
          className={cx(classes.header, { [classes.scrolled]: scrolled })}
        >
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Options</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
