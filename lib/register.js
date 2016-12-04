const components = {};

// export const components = new Proxy($components, {
//   get: function get(obj, name) {
//     const component = obj[name];
//     if (!component) throw new Error('Unknown ' + name + ' component');
//     return obj[name];
//   },
//   set: function set() {
//     throw new Error('Cannot rewrite component directly');
//   }
// });

function register(component, name, rewrite = false) {
  name = name || component.displayName;

  if (!name) {
    throw new Error('Invalid name: ' + name);
  }

  if (typeof component !== 'function' && typeof component !== 'string') {
    throw new Error(name + ' should be a string or a ReactClass');
  }
  // if (name === 'Layout') throw new Error('You cannot use \'Layout\' as a name');
  if (components[name] && !rewrite) {
    throw new Error('Component \'' + name + '\' already exists');
  }
  components[name] = component;
}

export default register;
export {
  components,
  register
};
