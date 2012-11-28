(function () {
  OrderEnforcer = function () {
    this.callbackCount = 0;
    this.lastExecutedIndex = -1;
  };

  OrderEnforcer.prototype.enforce = function (callback) {
    var currentIndex = this.callbackCount;
    this.callbackCount += 1;

    return function () {
      if(currentIndex >= this.lastExecutedIndex) {
        this.lastExecutedIndex = currentIndex;
        callback.apply(undefined, arguments);
      }
    };
  };
}());