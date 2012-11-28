# A Javascript callback order enforcer utility

Prevents asynchronous callbacks from firing out-of-order.
Here's a use-case:

Say we have a typeahead widget, that makes network requests that
might take a while to respond. Now say I'm typing "New Jersey"
into that typeahead -- during which two requests are made, one
for the string "New" and the other for the string "New Jersey".

Now say for some reason the result for "New Jersey" comes back
first, but there's still a callback registered for "New" -- when
the "New" callback gets triggered, we want to ignore it in this
case.

Example code:

    var order = new OrderEnforcer();
    setTimeout(order.enforce(function() { console.log('one'); }), 100);
    setTimeout(order.enforce(function() { console.log('two'); }), 1000);
    setTimeout(order.enforce(function() { console.log('three'); }), 500);

Output:

    one
    three
