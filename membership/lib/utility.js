/**
 * Created by artem on 15.11.2015.
 */

exports.randomString = function(length){
    length = length || 12;
    var chars = "0123456789ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghjklmnopqrstuvwxyz";
    var result = '';
    for(var i=0; i<length; i++){
        var rnum = Math.floor(Math.random()*chars.length);
        result += chars.substring(rnum, rnum+1);
    }
    return result;
};