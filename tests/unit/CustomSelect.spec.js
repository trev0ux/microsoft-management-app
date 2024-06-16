import { shallowMount } from '@vue/test-utils';
import CustomSelect from '@/components/molecules/forms/custom-select.vue';

describe('CustomSelect.vue', () => {
  const label = 'Status';
  const id = 'status-select';
  const options = [
    { value: 'to-do', label: 'Para fazer' },
    { value: 'active', label: 'Em andamento' },
    { value: 'done', label: 'Concluída' }
  ];

  it('emits update:modelValue when option is selected', async () => {
    const wrapper = shallowMount(CustomSelect, {
      props: { label, id, options, modelValue: 'to-do' }
    });

    const select = wrapper.find('select');
    await select.setValue('active');

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['active']);
  });
});
