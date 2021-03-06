import Component from '@/components/main-wrapper/main-content/users.vue'
import UserItem from '@/components/shared/user-item.vue'
import AddUserForm from '@/components/modals/add-user-form.vue'
import EditUserForm from '@/components/modals/edit-user-form.vue'
import factory from '@/tests/factory'
import { userStore } from '@/stores'

describe('components/main-wrapper/main-content/users', () => {
  it('displays the users', () => {
    userStore.all = factory('user', 10)
    const wrapper = mount(Component)
    wrapper.findAll(UserItem).should.have.lengthOf(10)
  })

  it('adds new user', () => {
    userStore.all = factory('user', 10)
    const wrapper = mount(Component)
    const openStub = sinon.stub(wrapper.vm.$refs.addUserForm, 'open')
    wrapper.contains(AddUserForm).should.be.true
    wrapper.find('.btn-add').trigger('click')
    openStub.called.should.be.true
    openStub.restore()
  })

  it('edits a user', () => {
    userStore.all = factory('user', 10)
    const wrapper = mount(Component)
    const editStub = sinon.stub(wrapper.vm.$refs.editUserForm, 'open')
    wrapper.contains(EditUserForm).should.be.true
    wrapper.findAll('.btn-edit').at(0).trigger('click')
    editStub.calledWith(userStore.all[0]).should.be.true
    editStub.restore()
  })
})

