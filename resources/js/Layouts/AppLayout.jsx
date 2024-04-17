import ApplicationLogo from '@/Components/ApplicationLogo';
import { SimpleNavBar } from '@/Components/SimpleNavBar/SimpleNavBar';
import { usePage } from '@inertiajs/react';
import { AppShell, Burger, Group, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export default function AppLayout({ children }) {
  const [opened, { toggle }] = useDisclosure();
  const { auth } = usePage().props;
  return (
    <AppShell
      header={{
        height: {
          base: 50,
          sm: 0,
        },
        breakpoint: 0,
      }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header hiddenFrom='sm'>
        <Group align="center" mt={5} ml={10}>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <ApplicationLogo />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar>
        <SimpleNavBar user={auth.user}></SimpleNavBar>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
