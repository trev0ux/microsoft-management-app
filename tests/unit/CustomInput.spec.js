import { shallowMount } from '@vue/test-utils';
import CustomInput from '@/components/molecules/forms/custom-input.vue';

describe('CustomInput.vue', () => {
  it('renders props correctly when passed', () => {
    const label = 'Username';
    const errorMessage = 'Field is required';
    const id = 'username';
    const modelValue = 'john_doe';

    const wrapper = shallowMount(CustomInput, {
      props: { label, errorMessage, id, modelValue },
    });

    expect(wrapper.find('label').text()).toBe(label);
    expect(wrapper.find('input').element.value).toBe(modelValue);
    expect(wrapper.find('.invalid-feedback').text()).toBe(errorMessage);
  });

  it('does not render label and error message when not provided', () => {
    const wrapper = shallowMount(CustomInput, {
      props: { id: 'test' },
    });

    expect(wrapper.find('label').exists()).toBe(false);
    expect(wrapper.find('.invalid-feedback').exists()).toBe(false);
  });

  it('emits update:modelValue event when input value changes', async () => {
    const wrapper = shallowMount(CustomInput, {
      props: { id: 'test' },
    });
  
    const input = wrapper.find('input');
    await input.setValue('new_value');
  
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['new_value']);
  });
});
