
const _components = {};

export const components = new Proxy(_components, {
  get: function(obj, name) {
    var component = obj[name];
    if (!component) throw new Error('Unknown ' + name + ' component');
    return obj[name];
  }
});

export default function register(component, name) {
  name = name || component.displayName;
  if(name === 'Layout') throw new Error('You cannot use \'Layout\' as a name');
  if (_components[name]) {
    throw new Error('Component \'' + name + '\' already exists');
  }
  _components[name] = component;
};