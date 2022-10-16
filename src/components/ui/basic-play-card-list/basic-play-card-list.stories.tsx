import { ComponentMeta, Story } from '@storybook/react';
import { BasicPlayCard, IBasicPlayCardProps } from 'components/ui/basic-play-card';
import { BasicPlayCardList } from 'components/ui/basic-play-card-list';
import { CardDefault } from '../basic-play-card/basic-play-card.stories';
import { randomId } from '../../../shared/helpers';

export default {
  title: 'ui/BasicPlayCardList',
  component: BasicPlayCardList,
  subcomponents: { BasicPlayCard },
  decorators: [
    (Story) => (
      <div style={{ margin: '0 auto', maxWidth: '1440px' }}>
        <Story/>
      </div>
    ),
  ],
} as ComponentMeta<typeof BasicPlayCardList>;

const ListTemplate: Story = ({ items }) => (
  <BasicPlayCardList>
    {(items as IBasicPlayCardProps[]).map((item) => (
      <BasicPlayCard key={randomId()} {...item}/>
    ))}
  </BasicPlayCardList>
);

export const Default = ListTemplate.bind({});
Default.parameters = {
  layout: 'fullscreen'
};
Default.args = { items: Array.from(Array(7)).map(() => CardDefault.args) };
