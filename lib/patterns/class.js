var Schema = require('../Schema')

var ClassSchema = module.exports = Schema.extend({
  initialize : function(constructor) {
    this.constructor = constructor
  },
  
  compile : function() {
    return { references : [this.constructor], expression : 'instance instanceof {0}' }
  },
  
  generate : function() {
    var Constructor = function() {}
    Constructor.prototype = this.constructor.prototype
    
    return new Constructor()
  }
})


Schema.fromJS.def(function(constructor) {
  if (!(constructor instanceof Function)) return
  
  if (constructor.schema instanceof Function) {
    return constructor.schema.unwrap()
  } else {
    return new ClassSchema(constructor)
  }
})