import { mount, flushPromises } from '@vue/test-utils';
import CustomerForm from '@/components/organisms/customer-form/customer-form.vue';
import CustomInput from '@/components/molecules/forms/custom-input.vue';

jest.mock('uuid', () => ({
  v4: () => 'test-uuid'
}));

const mockStore = {
  state: {},
  commit: jest.fn()
};

describe('CustomerForm.vue', () => {
  let wrapper;
  let mockModalService;
  beforeEach(() => {
    mockModalService = {
      closeModal: jest.fn()
    };
    const customInputStub = {
      name: 'CustomInput',
      template: '<input type="text" :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" />',
      props: ['modelValue']
    };
    wrapper = mount(CustomerForm, {
      global: {
        provide: {
          store: mockStore,
          modalService: mockModalService
        },
        stubs: {
          CustomInput: customInputStub
        }
      }
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders the form', () => {
    expect(wrapper.find('form').exists()).toBe(true);
    expect(wrapper.findAllComponents(CustomInput).length).toBe(2);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });

  it('updates v-model when input changes', async () => {
    const nameInput = wrapper.findAllComponents(CustomInput)[0];
    const emailInput = wrapper.findAllComponents(CustomInput)[1];
    await nameInput.setValue('John Doe');
    await emailInput.setValue('john@example.com');
    expect(wrapper.vm.name).toBe('John Doe');
    expect(wrapper.vm.email).toBe('john@example.com');
  });

  it('calls store commit and closes modal on form submission', async () => {
    await wrapper.setData({
      name: 'John Doe',
      email: 'john@example.com'
    });
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    expect(mockStore.commit).toHaveBeenCalledWith('addCustomer', {
      id: 'test-uuid',
      name: 'John Doe',
      email: 'john@example.com',
      projects: []
    });
    expect(mockModalService.closeModal).toHaveBeenCalled();
  });

  it('clears the form after submission', async () => {
    await wrapper.setData({
      name: 'John Doe',
      email: 'john@example.com'
    });
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();
    expect(wrapper.vm.name).toBe('');
    expect(wrapper.vm.email).toBe('');
  });

  it('calls handleCustomerSubmit method on form submission', async () => {
    const handleCustomerSubmitSpy = jest.spyOn(wrapper.vm, 'handleCustomerSubmit');
    await wrapper.find('form').trigger('submit.prevent');
    expect(handleCustomerSubmitSpy).toHaveBeenCalled();
  });
});