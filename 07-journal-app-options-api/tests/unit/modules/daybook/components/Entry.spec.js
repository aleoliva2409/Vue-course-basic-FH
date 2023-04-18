import { shallowMount } from '@vue/test-utils';
import Entry from '@/modules/daybook/components/Entry.vue';
import { journalState } from '../../../mocks/test-journal-state';

describe('Tests on Entry Component', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  const wrapper = shallowMount(Entry, {
    props: {
      entry: journalState.entries[0],
    },
    global: {
      mocks: {
        $router: mockRouter,
      },
    },
  });

  test('should render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('should redirect when is clicked', () => {
    const entryContainer = wrapper.find('.entry-container');
    entryContainer.trigger('click');

    expect(mockRouter.push).toHaveBeenCalledWith({
      name: 'entry',
      params: {
        id: journalState.entries[0].id,
      },
    });
  });

  test('tests on computed props', () => {
    expect(wrapper.vm.day).toBe(23);
    expect(wrapper.vm.month).toBe('Julio');
    expect(wrapper.vm.year).toBe(2021);
  });
});
