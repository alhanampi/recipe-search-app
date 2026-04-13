import { useTranslation } from 'react-i18next';
import {
  BodyText,
  Divider,
  Intro,
  Item,
  ItemList,
  PageTitle,
  Section,
  SectionTitle,
  Wrapper,
} from './AboutPage.styled';

const AboutPage = () => {
  const { t } = useTranslation();

  const stackItems: string[] = t('about.stackItems', { returnObjects: true }) as string[];
  const structureItems: string[] = t('about.structureItems', { returnObjects: true }) as string[];

  const formatItem = (item: string) => {
    const [before, ...rest] = item.split('—');
    if (!rest.length) return <>{item}</>;
    return <><strong>{before.trim()}</strong> — {rest.join('—').trim()}</>;
  };

  return (
    <Wrapper>
      <PageTitle>{t('about.title')}</PageTitle>
      <Intro>{t('about.intro')}</Intro>

      <Section>
        <SectionTitle>{t('about.stackTitle')}</SectionTitle>
        <ItemList>
          {stackItems.map((item, i) => (
            <Item key={i}>{formatItem(item)}</Item>
          ))}
        </ItemList>
      </Section>

      <Divider />

      <Section>
        <SectionTitle>{t('about.structureTitle')}</SectionTitle>
        <ItemList>
          {structureItems.map((item, i) => (
            <Item key={i}>{formatItem(item)}</Item>
          ))}
        </ItemList>
      </Section>

      <Divider />

      <Section>
        <SectionTitle>{t('about.translationTitle')}</SectionTitle>
        <BodyText>{t('about.translationText')}</BodyText>
      </Section>

      <Divider />

      <Section>
        <SectionTitle>{t('about.authorTitle')}</SectionTitle>
        <BodyText>{t('about.authorText')}</BodyText>
      </Section>
    </Wrapper>
  );
};

export default AboutPage;
