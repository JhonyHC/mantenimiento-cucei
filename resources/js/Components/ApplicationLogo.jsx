import { Image } from '@mantine/core';

export default function ApplicationLogo({ w = 100, ...props }) {
  return <Image display="block" w={w} src="/img/logo-cucei.png" {...props} />;
}
