export default {
  beforeMount(el, binding) {
    const iconClass = `fa fa-${binding.value.icon} float-right  text-blue-500 text-xl`;
    // if (binding.value.right) {
    //   iconClass += 'float-left'
    // }

    // eslint-disable-next-line no-param-reassign
    el.innerHTML += `<i class="${iconClass}"></i>`;
  },
};
