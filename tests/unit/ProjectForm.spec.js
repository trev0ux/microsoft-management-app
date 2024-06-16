import { mount, flushPromises } from '@vue/test-utils';
import ProjectForm from '@/components/organisms/project-form/project-form.vue';
import CustomInput from '@/components/molecules/forms/custom-input.vue';
import CustomSelect from '@/components/molecules/forms/custom-select.vue';

jest.mock('uuid', () => ({
  v4: () => 'test-uuid'
}));

const mockStore = {
  getters: {
    customers: [
      { id: '1', name: 'Customer 1' },
      { id: '2', name: 'Customer 2' }
    ]
  },
  dispatch: jest.fn()
};

describe('ProjectForm.vue', () => {
  let wrapper;
  let mockModalService;

  beforeEach(() => {
    mockModalService = {
      closeModal: jest.fn()
    };

    wrapper = mount(ProjectForm, {
      global: {
        provide: {
          store: mockStore,
          modalService: mockModalService
        },
        stubs: {
          CustomInput: CustomInput,
          CustomSelect: CustomSelect
        }
      }
    });
  });

  afterEach(() => {
    wrapper.unmount();
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
    const descriptionInput = wrapper.find('textarea');
    await nameInput.setValue('Project Name');
    await descriptionInput.setValue('Project Description');
    expect(wrapper.vm.name).toBe('Project Name');
    expect(wrapper.vm.description).toBe('Project Description');
  });

  it('selects a customer from the options', async () => {
    const customerSelect = wrapper.findComponent(CustomSelect);
    await customerSelect.setValue('2');
    expect(wrapper.vm.customer).toBe('2');
  });

  it('calls store dispatch and closes modal on form submission', async () => {
    await wrapper.setData({
      name: 'Project Name',
      customer: '2',
      description: 'Project Description'
    });
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    expect(mockStore.dispatch).toHaveBeenCalledWith('addProjectToCustomer', {
      customerId: '2',
      project: {
        id: 'test-uuid',
        name: 'Project Name',
        customer: '2',
        description: 'Project Description',
        status: 'Nova',
        tasks: []
      }
    });
    expect(mockModalService.closeModal).toHaveBeenCalled();
  });

  it('clears the form after submission', async () => {
    const customerId = '';
    await wrapper.setData({
      name: 'Project Name',
      customer: customerId,
      description: 'Project Description'
    });
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();
    expect(wrapper.vm.name).toBe('');
    expect(wrapper.vm.customer).toBe('');
    expect(wrapper.vm.description).toBe('');
  });
});