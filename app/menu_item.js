
var MenuItem = class MenuItem {
  constructor (id, attrs = {}) {
    this.id = id;
    this.text = attrs.text;
    this.success_message = attrs.success_message;
    this.markup = attrs.markup;
  }
}

module.exports = MenuItem;
