const PropTypes = require("../node_modules/prop-types");
const { taggable } = require("./fusion:taggables");
const contentConfig = require("./fusion:content-config")
const json = require("./fusion:json") // Taggable(PropTypes.string, 'json')

module.exports = {
  boolean: taggable(PropTypes.bool, "boolean"),
  contentConfig,
  date: taggable(PropTypes.string, "date"),
  dateTime: taggable(PropTypes.string, "dateTime"),
  disabled: taggable(PropTypes.string, "disabled"),
  email: taggable(PropTypes.string, "email"),
  json, // Taggable(PropTypes.string, 'json'),
  kvp: taggable(PropTypes.object, "kvp"),
  label: taggable(PropTypes.string, "label"),
  list: taggable(PropTypes.arrayOf(PropTypes.string), "list"),
  richtext: taggable(PropTypes.string, "richtext"),
  select: taggable(PropTypes.oneOf, "select"),
  text: taggable(PropTypes.string, "text"),
  url: taggable(PropTypes.string, "url")
};
