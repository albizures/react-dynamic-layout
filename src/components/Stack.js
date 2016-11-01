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
  active: React.PropTypes.number
};

obj.getInitialState = function () {
  return {
    active: this.props.active || 0
  };
};

obj.process = function () {
  let tabs = [];
  let children = [];
  for (let index = 0; index < this.props.children.length; index++) {
    let {key, name, child} = this.props.children[index];
    let active = index === this.state.active;
    let classNameTab = classNames('tab', {active});
    let classNameBody = classNames('tab-body', {active});
    tabs.push(
      <div className={classNameTab} onClick={() => this.setState({active: index})} key={'tab' + key }>
        {name}
      </div>
    );
    children.push(
      <div className={classNameBody} key={'content-tab' + key }>
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
    this.props.type,
    {'no-tabs': !this.props.tabs}
  );
  return <div className={className} style={this.props.style}>
    {this.props.tabs ? <div className='content-tabs'>
      {tabs}
    </div> : null}
    {children}
  </div>;
};

const Stack = React.createClass(obj);

module.exports = Stack;