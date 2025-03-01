import { h, VNode } from 'vue'
import { mount } from '@vue/test-utils'
import { NDescriptions, NDescriptionsItem } from '../index'

function getDescriptionsItemList (): VNode[] {
  return (['早餐', '午餐', '晚餐', '夜宵'] as const).map((item) => {
    return h(NDescriptionsItem, { label: item }, { default: () => item })
  })
}

describe('n-descriptions', () => {
  it('should work with import on demand', () => {
    mount(NDescriptions)
  })

  it('should work with slots', async () => {
    let wrapper = mount(NDescriptions, {
      slots: { default: () => getDescriptionsItemList(), header: () => 'test' }
    })
    expect(wrapper.findAll('.n-descriptions-table-header').length).toBe(4)
    expect(wrapper.findAll('.n-descriptions-table-content').length).toBe(4)

    expect(wrapper.find('.n-descriptions-header').exists()).toBe(true)
    expect(wrapper.find('.n-descriptions-header').text()).toBe('test')

    wrapper = mount(NDescriptions, {
      slots: {
        default: () =>
          h(NDescriptionsItem, null, {
            default: () => 'test-default',
            label: () => 'test-label'
          })
      }
    })

    expect(wrapper.find('.n-descriptions-table-header').text()).toBe(
      'test-label'
    )
    expect(wrapper.find('.n-descriptions-table-content').text()).toBe(
      'test-default'
    )
  })

  it('should work with `bordered` prop', async () => {
    const wrapper = mount(NDescriptions)
    expect(wrapper.find('.n-descriptions').classes()).not.toContain(
      'n-descriptions--bordered'
    )

    await wrapper.setProps({ bordered: true })
    expect(wrapper.find('.n-descriptions').classes()).toContain(
      'n-descriptions--bordered'
    )
  })

  it('should work with `column` prop', async () => {
    const wrapper = mount(NDescriptions, {
      slots: { default: () => getDescriptionsItemList() }
    })
    expect(
      wrapper.find('.n-descriptions-table-row').element.childNodes.length
    ).toBe(3)

    await wrapper.setProps({ column: 4 })
    expect(
      wrapper.find('.n-descriptions-table-row').element.childNodes.length
    ).toBe(4)
  })

  it('should work with `label-align` prop', async () => {
    const wrapper = mount(NDescriptions, {
      slots: { default: () => getDescriptionsItemList() }
    })
    expect(wrapper.find('.n-descriptions').classes()).toContain(
      'n-descriptions--left-label-align'
    )

    await wrapper.setProps({ 'label-align': 'center' })
    expect(wrapper.find('.n-descriptions').classes()).toContain(
      'n-descriptions--center-label-align'
    )

    await wrapper.setProps({ 'label-align': 'right' })
    expect(wrapper.find('.n-descriptions').classes()).toContain(
      'n-descriptions--right-label-align'
    )
  })

  it('should work with `label-placement` prop', async () => {
    const wrapper = mount(NDescriptions, {
      slots: { default: () => getDescriptionsItemList() }
    })
    expect(wrapper.find('.n-descriptions').classes()).toContain(
      'n-descriptions--top-label-placement'
    )

    await wrapper.setProps({ 'label-placement': 'left' })
    expect(wrapper.find('.n-descriptions').classes()).toContain(
      'n-descriptions--left-label-placement'
    )
  })

  it('should work with `size` prop', async () => {
    const wrapper = mount(NDescriptions, {
      slots: { default: () => getDescriptionsItemList() }
    })
    expect(wrapper.find('.n-descriptions').classes()).toContain(
      'n-descriptions--medium-size'
    )

    await wrapper.setProps({ size: 'small' })
    expect(wrapper.find('.n-descriptions').classes()).toContain(
      'n-descriptions--small-size'
    )

    await wrapper.setProps({ size: 'large' })
    expect(wrapper.find('.n-descriptions').classes()).toContain(
      'n-descriptions--large-size'
    )
  })

  it('should work with `title` prop', async () => {
    const wrapper = mount(NDescriptions, {
      slots: { default: () => getDescriptionsItemList() }
    })
    expect(wrapper.find('.n-descriptions-header').exists()).not.toBe(true)

    await wrapper.setProps({ title: 'test' })
    expect(wrapper.find('.n-descriptions-header').exists()).toBe(true)
    expect(wrapper.find('.n-descriptions-header').text()).toBe('test')
  })
  it('should work with `separator` prop', async () => {
    const wrapper = mount(NDescriptions, {
      props: {
        labelPlacement: 'left'
      },
      slots: { default: () => getDescriptionsItemList() }
    })
    expect(wrapper.find('.n-descriptions-separator').text()).toEqual(':')

    await wrapper.setProps({ separator: '/' })
    expect(wrapper.find('.n-descriptions-separator').text()).toEqual('/')
  })
})
