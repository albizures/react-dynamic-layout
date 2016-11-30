
const $components = {};

export const components = new Proxy($components, {
  get: function get(obj, name) {
    const component = obj[name];
    if (!component) throw new Error('Unknown ' + name + ' component');
    return obj[name];
  }
});

export default function register(component, name) {
  name = name || component.displayName;
  if (name === 'Layout') throw new Error('You cannot use \'Layout\' as a name');
  if ($components[name]) {
    throw new Error('Component \'' + name + '\' already exists');
  }
  $components[name] = component;
}
