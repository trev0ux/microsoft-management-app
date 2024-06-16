import { mount } from '@vue/test-utils';
import TaskForm from '@/components/organisms/task-form/task-form.vue';
import CustomInput from '@/components/molecules/forms/custom-input.vue';

jest.mock('uuid', () => ({
  v4: () => 'test-uuid'
}));

const mockStore = {
  dispatch: jest.fn()
};

describe('TaskForm.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(TaskForm, {
      global: {
        mocks: {
          $store: mockStore
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
    jest.clearAllMocks();
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

  it('calls store dispatch on form submission', async () => {
    await wrapper.setData({
      name: 'Task Name',
      description: 'Task Description'
    });

    await wrapper.find('form').trigger('submit.prevent');

    expect(mockStore.dispatch).toHaveBeenCalledWith('projectModule/addTask', {
      projectId: 'test-project-id',
      task: {
        id: 'test-uuid',
        name: 'Task Name',
        description: 'Task Description',
        status: 'to-do'
      }
    });
  });

  it('emits close-modal event on form submission', async () => {
    await wrapper.setData({
      name: 'Task Name',
      description: 'Task Description'
    });

    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.emitted('close-modal')).toBeTruthy();
  });

  it('clears the form after submission', async () => {
    await wrapper.setData({
      name: 'Task Name',
      description: 'Task Description'
    });

    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.vm.name).toBe('');
    expect(wrapper.vm.description).toBe('');
  });
});