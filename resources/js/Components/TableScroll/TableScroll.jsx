import cx from 'clsx';
import { useState } from 'react';
import { Table, ScrollArea, Group, ActionIcon } from '@mantine/core';
import classes from './TableScroll.module.css';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { Link } from '@inertiajs/react';

export function TableScroll({ children, tableHeader }) {
  const [scrolled, setScrolled] = useState(false);
  return (
    <ScrollArea
      h={300}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table miw={700} striped>
        <Table.Thead
          className={cx(classes.header, { [classes.scrolled]: scrolled })}
        >
          {tableHeader}
        </Table.Thead>
        <Table.Tbody>{children}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
