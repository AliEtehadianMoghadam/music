export default {
  beforeMount(el, binding) {
    const iconClass = `fa fa-${binding.value} float-right text-xl`;
    // if (binding.modifires.blue) {
    //   iconClass += 'text-blue-500'
    // }

    // eslint-disable-next-line no-param-reassign
    el.innerHTML += `<i class="${iconClass}"></i>`;
  },
};
