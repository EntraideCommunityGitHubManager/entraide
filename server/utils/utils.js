
setStringValue=function(str, length){
    return str ? str.substring(0, length) : null;
};

setIntValue= function(val){
    return isNaN(parseInt(val)) ? null : parseInt(val);
};

setFloatValue= function(val){
    return isNaN(parseFloat(val)) ? null : parseFloat(val);
};

setDateValue= function(val){
    return isNaN(parseInt(val)) ? null : parseInt(val);
};

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

checkRange(min, max, val){
  return isNaN(parseInt(val)) && parseInt(val) >= min && parseInt(val) <= parseInt(max) ? val : 0;
}
