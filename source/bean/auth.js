var authBean = function(user){
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.user_name = user.user_name;
    this.password = user.password;
}

module.exports = authBean;