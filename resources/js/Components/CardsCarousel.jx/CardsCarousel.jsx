import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import {
  Paper,
  Text,
  Title,
  Button,
  useMantineTheme,
  rem,
} from '@mantine/core';
import classes from './CardsCarousel.module.css';

function Card({ path }) {
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      style={{ backgroundImage: `url(/storage/${path})` }}
      className={classes.card}
    >
      <div>
        {/* <Text className={classes.category} size="xs">
          {category}
        </Text> */}
        {/* <Title order={3} className={classes.title}>
          {title}
        </Title> */}
      </div>
      {/* <Button variant="white" color="dark">
        Read article
      </Button> */}
    </Paper>
  );
}

export function CardsCarousel({ data }) {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const slides = data.map(item => (
    <Carousel.Slide key={item.id}>
      <Card {...item} />
    </Carousel.Slide>
  ));
  return (
    <Carousel
      slideSize={{ base: '100%', sm: data.length === 1 ? '100%' : '50%' }}
      slideGap={{ base: rem(2), sm: 'xl' }}
      align="start"
      slidesToScroll={mobile ? 1 : 2}
    >
      {slides}
    </Carousel>
  );
}
