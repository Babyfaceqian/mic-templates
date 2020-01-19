// Import the mount() method from the test utils
// and the component you want to test
import { mount } from '@vue/test-utils'
import Main from '../Main'

describe('Main', () => {
  // Now mount the component and you have the wrapper
  const wrapper = mount(Main)

  // it's also easy to check for the existence of elements
  it('has a button', () => {
    expect(wrapper.contains('el-button')).toBe(true)
  })
})
