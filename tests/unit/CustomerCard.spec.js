import { shallowMount } from '@vue/test-utils';
import CustomerCard from '@/components/molecules/customer-card/customer-card.vue';

describe('CustomerCard.vue', () => {
  it('renders customer name and email correctly', () => {
    const name = 'Joao';
    const email = 'joao@exemplo.com';
    const wrapper = shallowMount(CustomerCard, {
      props: { name, email },
    });

    expect(wrapper.find('h3').text()).toBe(name);
    expect(wrapper.find('p').text()).toBe(email);
  });

  it('renders the component correctly', () => {
    const name = 'Jane Smith';
    const email = 'jane.smith@example.com';
    const wrapper = shallowMount(CustomerCard, {
      props: { name, email },
    });

    expect(wrapper.find('.customer-card').exists()).toBe(true);
    expect(wrapper.find('h3').exists()).toBe(true);
    expect(wrapper.find('p').exists()).toBe(true);
  });
});
