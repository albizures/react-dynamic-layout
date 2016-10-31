const React = require('react');
const classNames = require('classnames');
const obj = {};

obj.displayName = 'Stack';

obj.getDefaultProps = () => ({
  tabs: true
});

obj.propTypes = {
  children: React.PropTypes.array.isRequired,
  tabs: React.PropTypes.bool.isRequired,
  type: React.PropTypes.string.isRequired,
};

obj.process = function () {
  let tabs = [];
  let children = [];

  for (let index = 0; index < this.props.children.length; index++) {
    let {key, name, child} = this.props.children[index];
    tabs.push(
      <div className='tab' key={'tab' + key }>
        {name}
      </div>
    );
    children.push(
      <div key={'content-tab' + key }>
        {child}
      </div>
    );
  }
  return {tabs, children};
}

obj.render = function () {
  let {tabs, children} = this.process();
  let className = classNames(
    'stack',
    this.props.type
  );
  return <div className={className} style={this.props.style}>
    {this.props.tabs ? <div className='content-tab'>
      {tabs}
    </div> : null}
    {children}
  </div>;
};

const Stack = React.createClass(obj);

module.exports = Stack;