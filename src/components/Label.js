const React = require('react');
const { register } = require('./Layout.js');

function Label (props) {
  return <label>{props.text}</label>;
};
Label.displayName = 'Label';

module.exports = Label;

register(Label, 'Label');