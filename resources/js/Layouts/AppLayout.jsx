import ApplicationLogo from '@/Components/ApplicationLogo';
import { SimpleNavBar } from '@/Components/SimpleNavBar/SimpleNavBar';
import { AppShell, Burger, Group, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export default function AppLayout({ children, ...props }) {
  const [opened, { toggle }] = useDisclosure();
  console.log(props);
  return (
    <AppShell
      header={{ height: 50 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group align="center" mt={5} ml={10}>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <ApplicationLogo />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <SimpleNavBar></SimpleNavBar>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
