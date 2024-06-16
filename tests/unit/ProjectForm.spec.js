import { mount } from '@vue/test-utils';
import ProjectForm from '@/components/organisms/project-form/project-form.vue';
import CustomSelect from '@/components/molecules/forms/custom-select.vue';
import CustomInput from '@/components/molecules/forms/custom-input.vue';

jest.mock('uuid', () => ({
  v4: () => 'test-uuid'
}));

const mockStore = {
  dispatch: jest.fn(),
  getters: {
    'customerModule/customers': [
      { id: '1', name: 'Customer 1' },
      { id: '2', name: 'Customer 2' },
    ],
  },
};

describe('ProjectForm', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ProjectForm, {
      global: {
        mocks: {
          $store: mockStore
        },
        stubs: {
          CustomSelect,
          CustomInput,
        }
      }
    });
  });

  afterEach(() => {
    wrapper.unmount();
    jest.clearAllMocks();
  });

  it('renders the form', () => {
    expect(wrapper.find('form').exists()).toBe(true);
    expect(wrapper.findComponent(CustomInput).exists()).toBe(true);
    expect(wrapper.findComponent(CustomSelect).exists()).toBe(true);
    expect(wrapper.find('textarea').exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });

  it('updates v-model when input changes', async () => {
    const nameInput = wrapper.findComponent(CustomInput);
    const customerSelect = wrapper.findComponent(CustomSelect);
    const descriptionInput = wrapper.find('textarea');

    await nameInput.setValue('Project Name');
    await customerSelect.setValue('1');
    await descriptionInput.setValue('Project Description');

    expect(wrapper.vm.name).toBe('Project Name');
    expect(wrapper.vm.customer).toBe('1');
    expect(wrapper.vm.description).toBe('Project Description');
  });

  it('populates customers correctly', () => {
    const options = wrapper.vm.populateCustomers;
    expect(options.length).toBe(2);
    expect(options[0]).toEqual({ value: '1', label: 'Customer 1' });
    expect(options[1]).toEqual({ value: '2', label: 'Customer 2' });
  });

  it('calls store dispatch on form submission', async () => {
    await wrapper.setData({
      name: 'Project Name',
      customer: '1',
      description: 'Project Description'
    });

    await wrapper.find('form').trigger('submit.prevent');

    expect(mockStore.dispatch).toHaveBeenCalledWith('projectModule/addProjectToCustomer', {
      customerId: '1',
      project: {
        id: 'test-uuid',
        name: 'Project Name',
        customer: '1',
        description: 'Project Description',
        status: 'Nova',
        tasks: [],
      }
    });
  });

  it('emits close-modal event on form submission', async () => {
    await wrapper.setData({
      name: 'Project Name',
      customer: '1',
      description: 'Project Description'
    });

    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.emitted('close-modal')).toBeTruthy();
  });

  it('clears the form after submission', async () => {
    await wrapper.setData({
      name: 'Project Name',
      customer: '1',
      description: 'Project Description'
    });

    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.vm.name).toBe('');
    expect(wrapper.vm.description).toBe('');
  });
});