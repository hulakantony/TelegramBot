module.exports.saveImageInfo = (payload) => {
  const { imageName, id } = payload;
  return {
    name: 'save_image_info',
    text: `insert into images(image_name, user_id, captured_at)
    values($1, $2, CURRENT_TIMESTAMP + '2 hour'::interval)`,
    values: [imageName, id]
  };
};

module.exports.getLastFiveImages = () => {
  return {
    name: 'get_last_5_images',
    text: `select image_name, first_name, last_name, captured_at 
    from images
    left join users on images.user_id = users.id
    order by captured_at desc limit 5;`
  }
}