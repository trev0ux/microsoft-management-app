// Import necessary modules and components
import { mount, flushPromises } from '@vue/test-utils';
import TaskForm from '@/components/organisms/task-form/task-form.vue';
import CustomInput from '@/components/molecules/forms/custom-input.vue';

// Mock uuid module
jest.mock('uuid', () => ({
  v4: () => 'test-uuid'
}));

// Mock Vuex store
const mockStore = {
  dispatch: jest.fn()
};

describe('TaskForm.vue', () => {
  let wrapper;
  let mockModalService;

  beforeEach(() => {
    mockModalService = {
      closeModal: jest.fn()
    };

    wrapper = mount(TaskForm, {
      global: {
        mocks: {
          $store: mockStore // Provide the mock store instance
        },
        provide: {
          modalService: mockModalService
        },
        stubs: {
          CustomInput: CustomInput
        }
      },
      props: {
        projectId: 'test-project-id'
      }
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders the form', () => {
    expect(wrapper.find('form').exists()).toBe(true);
    expect(wrapper.findComponent(CustomInput).exists()).toBe(true);
    expect(wrapper.find('textarea').exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });

  it('updates v-model when input changes', async () => {
    const nameInput = wrapper.findComponent(CustomInput);
    const descriptionInput = wrapper.find('textarea');
    await nameInput.setValue('Task Name');
    await descriptionInput.setValue('Task Description');
    expect(wrapper.vm.name).toBe('Task Name');
    expect(wrapper.vm.description).toBe('Task Description');
  });

  it('calls store dispatch and closes modal on form submission', async () => {
    await wrapper.setData({
      name: 'Task Name',
      description: 'Task Description'
    });
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    expect(mockStore.dispatch).toHaveBeenCalledWith('addTask', {
      projectId: 'test-project-id',
      task: {
        id: 'test-uuid',
        name: 'Task Name',
        description: 'Task Description',
        status: 'to-do'
      }
    });
    expect(mockModalService.closeModal).toHaveBeenCalled();
  });

  it('clears the form after submission', async () => {
    const clearFormSpy = jest.spyOn(wrapper.vm, 'clearForm');
    await wrapper.setData({
      name: 'Task Name',
      description: 'Task Description'
    });
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();
    expect(clearFormSpy).toHaveBeenCalled();
  });
});