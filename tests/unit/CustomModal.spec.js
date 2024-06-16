import { mount, flushPromises } from '@vue/test-utils';
import { reactive, ref } from 'vue';
import CustomModal from "@/components/organisms/custom-modal/custom-modal.vue"; // Update this path

describe('CustomModal.vue', () => {
  let wrapper;
  let mockModalService;

  beforeEach(() => {
    mockModalService = {
      modalState: ref(reactive({ isVisible: true })),
      closeModal: jest.fn()
    };
  });

  afterEach(() => {
    if (wrapper && typeof wrapper.unmount === 'function') {
      wrapper.unmount();
    }
    wrapper = null;
    jest.clearAllMocks();
  });

  const createWrapper = () => {
    return mount(CustomModal, {
      global: {
        provide: {
          modalService: mockModalService
        }
      },
      slots: {
        header: '<h1>Test Header</h1>',
        default: '<p>Test Content</p>'
      }
    });
  };

  it('renders when isVisible is true', async () => {
    wrapper = createWrapper();
    await flushPromises();
    expect(wrapper.find('.modal').exists()).toBe(true);
    expect(wrapper.find('.modal').classes()).toContain('show');
  });

  it('does not render when isVisible is false', async () => {
    mockModalService.modalState.value.isVisible = false;
    wrapper = createWrapper();
    await flushPromises();
    expect(wrapper.find('.modal').exists()).toBe(false);
  });

  it('renders the header slot content', async () => {
    wrapper = createWrapper();
    await flushPromises();
    expect(wrapper.find('.modal-title h1').text()).toBe('Test Header');
  });

  it('renders the default slot content', async () => {
    wrapper = createWrapper();
    await flushPromises();
    expect(wrapper.find('.modal-body p').text()).toBe('Test Content');
  });

  it('calls closeModal when close button is clicked', async () => {
    wrapper = createWrapper();
    await flushPromises();
    await wrapper.find('.btn-close').trigger('click');
    expect(mockModalService.closeModal).toHaveBeenCalled();
  });

  it('has the correct modal classes', async () => {
    wrapper = createWrapper();
    await flushPromises();
    expect(wrapper.find('.modal').classes()).toContain('custom-modal');
    expect(wrapper.find('.modal').classes()).toContain('fade');
    expect(wrapper.find('.modal-dialog').classes()).toContain('modal-lg');
  });

  it('has the correct accessibility attributes', async () => {
    wrapper = createWrapper();
    await flushPromises();
    expect(wrapper.find('.modal').attributes('role')).toBe('dialog');
    expect(wrapper.find('.modal').attributes('tabindex')).toBe('-1');
    expect(wrapper.find('.btn-close').attributes('aria-label')).toBe('Close');
  });

  it('updates visibility when modalState changes', async () => {
    wrapper = createWrapper();
    await flushPromises();
    expect(wrapper.find('.modal').exists()).toBe(true);
    
    mockModalService.modalState.value.isVisible = false;
    await flushPromises();
    expect(wrapper.find('.modal').exists()).toBe(false);

    mockModalService.modalState.value.isVisible = true;
    await flushPromises();
    expect(wrapper.find('.modal').exists()).toBe(true);
  });
});