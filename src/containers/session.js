var UserProfile = (function() {
    var firstName = "";
  
    var getName = function() {
      return firstName;    // Or pull this from cookie/localStorage
    };
  
    var setName = function(name) {
      firstName = name;     
      // Also set this in cookie/localStorage
    };
  
    return {
      getName: getName,
      setName: setName
    }
  
  })();
  
  export default UserProfile;