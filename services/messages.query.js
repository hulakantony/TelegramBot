module.exports.saveUserMessage = (payload) => {
  const { text, from: { id } } = payload;
  return {
    name: 'save_user_message',
    text: `insert into messages(text, user_id, sended_at)
    values($1, $2, CURRENT_TIMESTAMP + '2 hour'::interval)`,
    values: [text, id]
  };
}

module.exports.getLastFiveMessages = () => {
  return {
    name: 'get_last_5_messages',
    text: `select first_name, last_name, text, sended_at 
    from messages
    left join users on messages.user_id = users.id
    order by sended_at desc limit 5;`
  }
}