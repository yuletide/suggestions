'Use strict';

var List = function(component) {
  this.component = component;
  this.items = [];
  this.active = 0;
  this.element = document.createElement('ul');
  this.element.className = 'suggestions';

  // selectingListItem is set to true in the time between the mousedown and mouseup when clicking an item in the list
  // mousedown on a list item will cause the input to blur which normally hides the list, so this flag is used to keep
  // the list open until the mouseup
  this.selectingListItem = false;

  component.el.parentNode.insertBefore(this.element, component.el.nextSibling);
  return this;
};

List.prototype.show = function() {
  this.element.style.display = 'block';
};

List.prototype.hide = function() {
  this.element.style.display = 'none';
};

List.prototype.add = function(item) {
  this.items.push(item);
};

List.prototype.clear = function() {
  this.items = [];
  this.active = 0;
};

List.prototype.isEmpty = function() {
  return !this.items.length;
};

List.prototype.draw = function() {
  this.element.innerHTML = '';

  if (this.items.length === 0) {
    this.hide();
    return;
  }

  for (var i = 0; i < this.items.length; i++) {
    this.drawItem(this.items[i], this.active === i);
  }

  this.show();
};

List.prototype.drawItem = function(item, active) {
  var li = document.createElement('li'),
    a = document.createElement('a');

  if (active) li.className += ' active';
  // if the item has a classes array add that to the classlist
  console.log('drawitem',item);
  if (item.original.properties.classes) li.className += ' ' + item.original.properties.classes.join(' ');
  var img = document.createElement('img');
  if (item.original.icon) {
    if (item.original.icon.category) li.className += ' category';
    img.src = item.original.icon.path;
  } else if (item.original.context) {
    // mapbox address result;
    // img.src = 'https://www.mapbox.com/help/data/examples/marker-editor.svg'
    img.src = 'data:image/svg+xml;utf8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 21 21" height="21" width="21"><title>marker-stroked-15.svg</title><rect fill="none" x="0" y="0" width="21" height="21"></rect><path fill="#2751DF" transform="translate(3 3)" d="M7.5,14.941l-.4-.495c-.973-1.189-4.9-6.556-4.9-9.16A5.066,5.066,0,0,1,7.036,0q.222-.01.445,0a5.066,5.066,0,0,1,5.286,4.836q.01.225,0,.45c0,2.213-2.669,6.111-4.678,8.851ZM7.481.986a4.077,4.077,0,0,0-4.3,4.3c0,1.832,2.759,6.038,4.286,8.034,1.25-1.71,4.315-5.989,4.315-8.034a4.077,4.077,0,0,0-4.3-4.3Z" stroke="#315ee3" stroke-width="2" style="stroke-linejoin: round; stroke-miterlimit: 4;"></path><path fill="#2751DF" transform="translate(3 3)" d="M7.5,14.941l-.4-.495c-.973-1.189-4.9-6.556-4.9-9.16A5.066,5.066,0,0,1,7.036,0q.222-.01.445,0a5.066,5.066,0,0,1,5.286,4.836q.01.225,0,.45c0,2.213-2.669,6.111-4.678,8.851ZM7.481.986a4.077,4.077,0,0,0-4.3,4.3c0,1.832,2.759,6.038,4.286,8.034,1.25-1.71,4.315-5.989,4.315-8.034a4.077,4.077,0,0,0-4.3-4.3Z"></path></svg>';
  }
  a.appendChild(img);
  a.innerHTML += item.string;
  li.appendChild(a);
  this.element.appendChild(li);

  li.addEventListener('mousedown', function() {
    this.selectingListItem = true;
  }.bind(this));

  li.addEventListener('mouseup', function() {
    this.handleMouseUp.call(this, item);
  }.bind(this));
};

List.prototype.handleMouseUp = function(item) {
  this.selectingListItem = false;
  this.component.value(item.original);
  this.clear();
  this.draw();
};

List.prototype.move = function(index) {
  this.active = index;
  this.draw();
};

List.prototype.previous = function() {
  this.move(this.active === 0 ? this.items.length - 1 : this.active - 1);
};

List.prototype.next = function() {
  this.move(this.active === this.items.length - 1 ? 0 : this.active + 1);
};

module.exports = List;
