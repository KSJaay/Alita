const axios = require("axios");

async function fetchInstagram(id) {
  const url = `https://www.instagram.com/${id}/?__a=1&__d=dis`;
  // Get profile information using url
  const results = await axios.get(url);

  // If there's no results return false
  if (results.status !== 200) {
    return false;
  }

  const instaInfo = results.data;

  // Get information about the user
  const data = {
    id: instaInfo.graphql.user.username,
    name: instaInfo.graphql.user.full_name,
    bio: instaInfo.graphql.user.biography,
    followers: instaInfo.graphql.user.edge_followed_by.count,
    following: instaInfo.graphql.user.edge_follow.count,
    image: instaInfo.graphql.user.profile_pic_url_hd,
  };

  // Get information about each image
  const images = instaInfo.graphql.user.edge_owner_to_timeline_media;
  const imgArr = [];
  for (let i = 0; i < images.edges.length; i++) {
    const imageData = {
      image: images.edges[i].node.display_url,
      likes: images.edges[i].node.edge_liked_by.count,
      comments: images.edges[i].node.edge_media_to_comment.count,
      id: images.edges[i].node.shortcode,
    };
    imgArr.push(imageData);
  }

  // Sort likes from most to least
  const topImage = imgArr.sort((a, b) => {
    return b.likes - a.likes;
  })[0];

  data.topImage = topImage;
  data.imageData = imgArr;

  return data;
}

module.exports = fetchInstagram;
