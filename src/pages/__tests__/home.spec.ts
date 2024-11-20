import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import HomeScreen from '@/pages/index.vue';

vi.mock('@/stores/auth', () => ({
  default: vi.fn(() => ({
    name: ref('John Doe'),
    email: ref('john.doe@example.com'),
  })),
}));

describe('PersonComponent.vue', () => {
  let wrapper: ReturnType<typeof mount>;

  beforeEach(() => {
    wrapper = mount(HomeScreen, {
      global: {
        stubs: {
          RouterLink: true,
          Button: true,
        },
      },
    });
  });

  it('renders the component with initial values', () => {
    expect(wrapper.find('main').exists()).toBe(true);
    expect(wrapper.find('p').text()).toContain('25');
    expect(wrapper.text()).toContain('BonjourJohn Doe');
    expect(wrapper.text()).toContain('email : john.doe@example.com');
  });

  it('renders RouterLink correctly', () => {
    const routerLink = wrapper.findComponent({ name: 'RouterLink' });
    expect(routerLink.exists()).toBe(true);
  });

  it('renders a static anchor link', () => {
    const anchor = wrapper.find('a');
    expect(anchor.attributes('href')).toBe('/about');
    expect(anchor.text()).toBe('About');
  });
});
