// The constructor of the eventFramework
function eventFramework() {

    //alert("eventFramework");
	this.handlers = [];
}

// Triggers the event specified by the name and passes the eventArgs to listeners
eventFramework.prototype.trigger = function (name, eventArgs) {

    //alert("this.handlers.length = " + this.handlers.length);
    for (var i = 0; i < this.handlers.length; i++) {
        if (this.handlers[i].eventName == name)
            this.handlers[i].eventHandler.call(this, eventArgs);
    }
}

// Adds a listener/subscriber to the event specified by the 'name' parameter
eventFramework.prototype.addListener = function(name, handler) {

  //  alert("this.handlers.length = " + this.handlers.length);  

  if(typeof(name) != 'string' || typeof(handler) != 'function')
  {
		throw new SyntaxError("Invalid parameters when creating listener with the following arguments: 'Name': " + name + ", 'Handler': " + handler);
  }

this.handlers.push({ "eventName": name, "eventHandler": handler });

}

// Initializes the eventFramework and makes it available globally
if (events == null)
{
var events = new eventFramework();
}

