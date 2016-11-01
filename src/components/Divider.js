const React = require('react');
const obj = {};

obj.displayName = 'Divider';

obj.render = function () {
  return <div className={this.props.className}>
    <div className='divider-content'></div>
  </div>;
};

const Divider = React.createClass(obj);

module.exports = Divider;