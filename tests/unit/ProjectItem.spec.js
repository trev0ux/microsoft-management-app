import { shallowMount } from '@vue/test-utils';
import ProjectItem from '@/components/molecules/project-item/project-item.vue';

describe('ProjectItem.vue', () => {
  it('renders project name, status, and customer correctly', () => {
    const name = 'Project ABC';
    const status = 'Active';
    const customer = 'Company XYZ';

    const wrapper = shallowMount(ProjectItem, {
      props: { name, status, customer },
      slots: {
        default: '<p>Additional content here</p>',
      },
    });

    expect(wrapper.find('h3').text()).toBe(name);
    expect(wrapper.find('h4').text()).toContain(status);
    expect(wrapper.find('h5').text()).toBe(customer);
    expect(wrapper.find('p').text()).toBe('Additional content here');
  });

  it('renders the component correctly with default status', () => {
    const name = 'Project XYZ';
    const customer = 'Company ABC';

    const wrapper = shallowMount(ProjectItem, {
      props: { name, customer },
    });

    expect(wrapper.find('.project-item').exists()).toBe(true);
    expect(wrapper.find('h3').text()).toBe(name);
    expect(wrapper.find('h4').text()).toContain('');
    expect(wrapper.find('h5').text()).toBe(customer);
  });
});
