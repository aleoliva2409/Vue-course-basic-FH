import { shallowMount } from '@vue/test-utils';
import Indecision from '../../../src/components/Indesicion.vue';

describe('Indecision component', () => {
  let wrapper;
  let clgSpy;

  // ? hacemos un mock del fetch en node, dentro del parametro podemos enviar la respuesta
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          answer: 'yes',
          forced: false,
          image: 'https://yesno.wtf/assets/yes/2.gif',
        }),
    })
  );

  beforeEach(() => {
    wrapper = shallowMount(Indecision);
    clgSpy = jest.spyOn(console, 'log');
    jest.clearAllMocks();
  });

  test('should match with snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('wrinting on input should do nothing (console.log)', async () => {
    //? usamos el wapper para selectionar el mentodo getAnswer pero debemos ponerle el '.vm'
    const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer');

    const input = wrapper.find('input');
    await input.setValue('vamos los pibes');

    expect(clgSpy).toHaveBeenCalledTimes(1);
    expect(getAnswerSpy).toHaveBeenCalledTimes(0);
  });

  test('wrinting symbol "?" should fetch getAnswer', async () => {
    const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer');

    const input = wrapper.find('input');
    await input.setValue('Soy el mejor?');

    expect(clgSpy).toHaveBeenCalledTimes(1);
    expect(getAnswerSpy).toHaveBeenCalled();
  });

  test('tests on getAnswer', async () => {
    await wrapper.vm.getAnswer();

    const img = wrapper.find('img');

    expect(img.exists()).toBeTruthy();

    // ? accedemos a las variables en vue mediante wapper.vm
    expect(wrapper.vm.img).toBe('https://yesno.wtf/assets/yes/2.gif');
    expect(wrapper.vm.answer).toBe('Yes!');
  });

  test('tests on getAnswer - Error', async() => {
    fetch.mockImplementationOnce(() => Promise.reject('Api is down'));
    
    await wrapper.vm.getAnswer();
    
    const img = wrapper.find('img');

    expect(img.exists()).toBeFalsy();
    expect(wrapper.vm.answer).toBe("Can't load api response");
  });
});
