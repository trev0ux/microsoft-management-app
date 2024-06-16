import { mount, flushPromises } from '@vue/test-utils';
import CustomerForm from '@/components/organisms/customer-form/customer-form.vue';
import CustomInput from '@/components/molecules/forms/custom-input.vue';
import * as uuid from 'uuid';

jest.mock('uuid', () => ({
  v4: jest.fn()
}));

const mockStore = {
  dispatch: jest.fn()
};

describe('CustomerForm.vue', () => {
  let wrapper;
  let mockModalService;

  beforeEach(() => {
    uuid.v4.mockReturnValue('test-uuid');
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
          modalService: mockModalService
        },
        mocks: {
          $store: mockStore
        },
        stubs: {
          CustomInput: customInputStub
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

  it('dispatches action and emits close-modal event on form submission', async () => {
    await wrapper.setData({
      name: 'John Doe',
      email: 'john@example.com'
    });

    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    expect(mockStore.dispatch).toHaveBeenCalledWith('customerModule/addCustomer', {
      id: 'test-uuid',
      name: 'John Doe',
      email: 'john@example.com',
      projects: []
    });

    expect(wrapper.emitted('close-modal')).toBeTruthy();
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