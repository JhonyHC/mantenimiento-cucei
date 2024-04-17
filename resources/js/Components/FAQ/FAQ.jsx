import {
  Image,
  Accordion,
  Grid,
  Container,
  Title,
  Text,
  Highlight,
} from '@mantine/core';
import classes from './FAQ.module.css';

const placeholder =
  'It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.';

export function FAQ({ role, faqs }) {
  return (
    <div className={classes.wrapper}>
      <Container size="lg">
        <Grid id="faq-grid" gutter={50}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Image src="/img/faq.png" alt="Frequently Asked Questions" />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Title order={2} fw={400} ta="left" className={classes.title}>
              En tu rol de <b>{role}</b> puedes hacer lo siguiente:
            </Title>

            <Accordion
              chevronPosition="right"
              defaultValue="reset-password"
              variant="separated"
              my={20}
            >
              {faqs.map((faq, index) => {
                return (
                  <Accordion.Item
                    key={index}
                    className={classes.item}
                    value={`faq-${index}`}
                  >
                    <Accordion.Control>{faq.question}</Accordion.Control>
                    <Accordion.Panel>{faq.answer}</Accordion.Panel>
                  </Accordion.Item>
                );
              })}

              {/* <Accordion.Item className={classes.item} value="credit-card">
                <Accordion.Control>
                  Do you store credit card information securely?
                </Accordion.Control>
                <Accordion.Panel>{placeholder}</Accordion.Panel>
              </Accordion.Item> */}
            </Accordion>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}
