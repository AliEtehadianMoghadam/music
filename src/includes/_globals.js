import _ from 'lodash';

export default {
  install(app) {
    const baseComponent = require.context('../components/base/', false, /[A-Za-z0-9-_,\s]+\.vue$/i);

    baseComponent.keys().forEach((fileName) => {
      const componentConfig = baseComponent(fileName);
      const componentName = _.upperFirst(
        _.camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')),
      );

      //   console.log(fileName, componentName);

      app.component(`Base${componentName}`, componentConfig.default || componentConfig);
    });
  },
};
