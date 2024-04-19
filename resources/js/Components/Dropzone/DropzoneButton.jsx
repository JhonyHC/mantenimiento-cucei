import { useRef } from 'react';
import {
  Text,
  Group,
  Button,
  rem,
  useMantineTheme,
  Image,
} from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE, MIME_TYPES } from '@mantine/dropzone';
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons-react';
import classes from './DropzoneButton.module.css';

export function DropzoneButton({ setData, setError }) {
  const theme = useMantineTheme();
  const openRef = useRef(null);

  return (
    <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef}
        onDrop={files => {
          setData('files', files);
        }}
        onReject={files => {
          setError('files', files);
          console.log('rejected files', files);
        }}
        onDragEnter={() => setError('files', '')}
        onFileDialogOpen={() => setError('files', '')}
        className={classes.dropzone}
        radius="md"
        accept={IMAGE_MIME_TYPE}
        maxSize={5 * 1024 ** 2}
        maxFiles={7}
      >
        <div style={{ pointerEvents: 'none' }}>
          <Group justify="center">
            <Dropzone.Accept>
              <IconDownload
                style={{ width: rem(50), height: rem(50) }}
                color={theme.colors.blue[6]}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                style={{ width: rem(50), height: rem(50) }}
                color={theme.colors.red[6]}
                stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconCloudUpload
                style={{ width: rem(50), height: rem(50) }}
                stroke={1.5}
              />
            </Dropzone.Idle>
          </Group>

          <Text ta="center" fw={700} fz="lg" mt="xl">
            <Dropzone.Accept>Drop files here</Dropzone.Accept>
            <Dropzone.Reject>Images less than 5mb</Dropzone.Reject>
            <Dropzone.Idle>Upload evidence</Dropzone.Idle>
          </Text>
          <Text ta="center" fz="sm" mt="xs" c="dimmed">
            Drag&apos;n&apos;drop images here to upload. We can accept any type
            of files that are less than 5mb in size.
          </Text>
        </div>
      </Dropzone>

      <Button
        className={classes.control}
        size="md"
        radius="xl"
        onClick={() => openRef.current?.()}
      >
        Select files
      </Button>
    </div>
  );
}
