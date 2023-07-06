const axios = require("axios");

class Reddit {
  constructor(subreddit) {
    this.url = `https://www.reddit.com/r/${subreddit}/hot/.json?count=100`;
    this.timestamp = Date.now();
    this.posts = [];

    this.fetch();

    setInterval(() => {
      this.fetch();
    }, 60000 * 5);
  }

  random() {
    return this.posts[Math.floor(Math.random() * this.posts.length)];
  }

  async fetch() {
    const query = await axios.get(this.url);

    this.posts = query.data.data.children
      .filter((post) => post.data.post_hint === "image")
      .map((post) => {
        return {
          title: post.data.title,
          permalink: `https://reddit.com${post.data.permalink}`,
          url: post.data.url,
        };
      });
  }
}

module.exports = Reddit;
