module.exports.userLoginQuery = (user) => {
  const { id, first_name, last_name } = user;
  return {
    name: 'save_user_data',
    text: `insert into users(first_name, last_name, id, start_time)
    values($1, $2, $3, CURRENT_TIMESTAMP + '2 hour'::interval)`,
    values: [first_name, last_name, id]
  };
};

module.exports.checkUserExist = (id) => {
  return {
    name: 'check_user_exists',
    text: `select exists(select id from users where id=$1)`,
    values: [id]
  };
}

module.exports.updateUserStartTime = (id) => {
  return {
    name: 'update_user_start_time',
    text: `UPDATE users SET start_time = CURRENT_TIMESTAMP + '2 hour'::interval WHERE id = $1`,
    values: [id]
  };
}