import { usePage } from '@inertiajs/react';
import {
  Text,
  Avatar,
  Group,
  Menu,
  Button,
  ActionIcon,
  rem,
  Textarea,
  Stack,
} from '@mantine/core';
import { IconDots, IconPencil, IconTrash } from '@tabler/icons-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from 'react';

dayjs.extend(relativeTime);

export function CommentSimple({
  comment,
  data,
  setData,
  put,
  errors,
  processing,
  handleDeleteComment,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const { auth } = usePage().props;

  const handleEditComment = () => {
    put(route('comments.update', [comment.id]), {
      onSuccess: () => {
        setIsEditing(false);
        setData('content', '');
      },
      preserveScroll: true,
    });
  };
  return (
    <div>
      <Group>
        <Avatar radius="xl" color="indigo">
          {comment.user.name[0]}
        </Avatar>
        <div>
          <Text size="sm">
            {comment.user.name}{' '}
            <Text c="dimmed" component="span">
              ({auth.user.role})
            </Text>
          </Text>
          <Text size="xs" c="dimmed">
            {dayjs(comment.created_at).fromNow()}
          </Text>
        </div>
        {(auth.user.id === comment.user.id || auth.user.role === 'admin') && (
          <Menu shadow="md" width={200}>
            <Menu.Target ml="auto">
              <ActionIcon size="md" variant="subtle" radius="md">
                <IconDots />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                color="blue"
                leftSection={
                  <IconPencil style={{ width: rem(14), height: rem(14) }} />
                }
                onClick={() => {
                  setIsEditing(true);
                  setData('content', comment.content);
                }}
              >
                Editar
              </Menu.Item>
              <Menu.Item
                color="red"
                leftSection={
                  <IconTrash style={{ width: rem(14), height: rem(14) }} />
                }
                onClick={() => handleDeleteComment(comment.id)}
              >
                Eliminar
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        )}
      </Group>
      {isEditing ? (
        <Stack>
          <Textarea
            radius="md"
            label="Editando Comentario:"
            required
            placeholder="Escribe tu comentario aquí..."
            value={data.content}
            onChange={e => setData('content', e.target.value)}
            error={errors.content}
          />
          <Button onClick={handleEditComment} loading={processing}>
            Editar comentario
          </Button>
          <Button color="red" onClick={() => setIsEditing(false)}>
            Cancelar
          </Button>
        </Stack>
      ) : (
        <Text pl={54} pt="sm" size="sm">
          {comment.content}
        </Text>
      )}
    </div>
  );
}
