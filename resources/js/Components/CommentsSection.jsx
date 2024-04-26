import { Button, Group, Stack, Text, Textarea, Title } from '@mantine/core';
import { CommentSimple } from './CommentSimple';
import { IconPlus, IconX } from '@tabler/icons-react';
import { useState } from 'react';
import { router, useForm } from '@inertiajs/react';

export default function CommentsSection({ report: { id, comments } }) {
  const [addComment, setAddComment] = useState(false);
  const {
    data,
    setData,
    processing,
    errors,
    post,
    put,
    delete: destroy,
  } = useForm({
    content: '',
  });

  const handleCreateComment = () => {
    post(route('reports.comments.store', [id]), {
      onSuccess: () => {
        setAddComment(false);
        setData('content', '');
      },
      preserveScroll: true,
    });
  };

  const handleDeleteComment = commentId => {
    destroy(route('comments.destroy', [commentId]), {
      preserveScroll: true,
    });
    setData('content', '');
  };

  return (
    <Stack my={30}>
      <Group justify="space-between">
        <Title order={2}>
          Comentarios{' '}
          <Text c="dimmed" component="span" size="xl">
            ({comments.length})
          </Text>
        </Title>

        <Button
          color={addComment ? 'red' : 'blue'}
          onClick={() => setAddComment(!addComment)}
          leftSection={
            addComment ? <IconX size={20} /> : <IconPlus size={20} />
          }
        >
          {addComment ? 'Cancelar' : 'Agregar'}
        </Button>
      </Group>
      {addComment && (
        <>
          <Textarea
            radius="md"
            label="Comentario:"
            description="Di algo relevante del reporte"
            required
            placeholder="Escribe tu comentario aquí..."
            value={data.content}
            onChange={e => setData('content', e.target.value)}
            error={errors.content}
          />
          <Button onClick={handleCreateComment} loading={processing}>
            Comentar
          </Button>
        </>
      )}
      {comments.map(comment => {
        return (
          <CommentSimple
            key={comment.id}
            comment={comment}
            data={data}
            setData={setData}
            put={put}
            errors={errors}
            processing={processing}
            handleDeleteComment={handleDeleteComment}
          />
        );
      })}
    </Stack>
  );
}
