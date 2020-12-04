const fetch = require("node-fetch");

module.exports.fetchChannel = async function(id){

let videosInfo = await fetchVideo(id)

if(videosInfo === false){
  return false;
}

const config = {
    headers: {
      'x-youtube-client-name': '1',
      'x-youtube-client-version': '2.20180222',
      'accept-language': 'en-US,en;q=0.5'
    }
}

const channelMetaData = videosInfo[1].response.metadata.channelMetadataRenderer
const channelVideoData = videosInfo[1].response.contents.twoColumnBrowseResultsRenderer.tabs[1].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].gridRenderer

let data = {
  channel: {
    name: channelMetaData.title,
    url: channelMetaData.channelUrl,
    avatar: channelMetaData.avatar.thumbnails[0].url
  },
  video: []
}


let limit = (channelVideoData.items.length < 10) ? channelVideoData.items.length : 10;
let j = 1;
for(let i=0; i < limit; i++){
  let videoData = channelVideoData.items[i].gridVideoRenderer
  let views = videoData.viewCountText.simpleText ? videoData.viewCountText.simpleText.replace(/[^0-9]/g, "") : 0
  let videoInfo = {
    views: parseInt(views),
    videoTime: j
  }
  data.video.push(videoInfo);
  j++
}

return data;

};


async function fetchVideo(id){

  const config = {
      headers: {
        'x-youtube-client-name': '1',
        'x-youtube-client-version': '2.20180222',
        'accept-language': 'en-US,en;q=0.5'
      }
  }

  let url = `https://youtube.com/channel/${id}/videos?flow=grid&view=0&pbj=1`;

  let video = await fetch(url, config)

  if(video.status != 200){
    url = `https://youtube.com/c/${id}/videos?flow=grid&view=0&pbj=1`;
    video = await fetch(url, config)

    if(video.status != 200){
      return false;
    }
  }

  return video.json();

}
