import { shallowMount } from '@vue/test-utils';
import Fab from '@/modules/daybook/components/Fab';

describe('Tests on Fab component', () => {
  test('should show default icon', () => {
    const wrapper = shallowMount(Fab);
    const defaultIcon = wrapper.find('i').classes('fa-plus');

    expect(defaultIcon).toBeTruthy();
  });

  test('should show prop icon: fa-circle', () => {
    const icon = 'fa-circle';
    const wrapper = shallowMount(Fab, {
      props: {
        icon,
      },
    });
    const defaultIcon = wrapper.find('i').classes('fa-plus');
    const propIcon = wrapper.find('i').classes(icon);

    expect(defaultIcon).toBeFalsy();
    expect(propIcon).toBeTruthy();
  });

  test('should emit on-click event when clicked', () => {
    const wrapper = shallowMount(Fab);

    const button = wrapper.find('button');

    button.trigger('click');

    expect(wrapper.emitted('on-click')).toBeTruthy();
    expect(wrapper.emitted('on-click')).toHaveLength(1);
  });
});
