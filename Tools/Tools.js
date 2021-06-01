module.exports.convertTime = async function(milliseconds){

    let roundTowardsZero = milliseconds > 0 ? Math.floor : Math.ceil;
    let days = roundTowardsZero(milliseconds / 86400000),
    hours = roundTowardsZero(milliseconds / 3600000) % 24,
    mins = roundTowardsZero(milliseconds / 60000) % 60,
    secs = roundTowardsZero(milliseconds / 1000) % 60;
    if(secs === 0){
        secs++;
    }
    let laDays = days > 0,
    laHours = hours > 0,
    laMinutes = mins > 0;
    let pattern =
    (!laDays ? "" : (laMinutes || laHours) ? "{days} days, " : "{days} days & ")+
    (!laHours ? "" : (laMinutes) ? "{hours} hours, " : "{hours} hours & ")+
    (!laMinutes ? "" : "{mins} mins")+
    (" {secs} seconds");
    let sentence = pattern
    .replace("{duration}", pattern)
    .replace("{days}", days)
    .replace("{hours}", hours)
    .replace("{mins}", mins)
    .replace("{secs}", secs);
    return sentence;

};

module.exports.randomNumber = async function(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
};

module.exports.resolveChannel = async function(search, guild){
    let channel = null;
    if(!search || typeof search !== "string") return;
    //Try to search using ID
    if(search.match(/^#&!?(\d+)$/)){
        let id = search.match(/^#&!?(\d+)$/)[1];
        channel = guild.channels.cache.get(id);
        if(channel) return channel;
    }
    //Got fucking lazy so I just removed the <#>
    if(search.includes("<#")){
        let firstChannel = search.replace("<#", "");
        let channelID = firstChannel.replace(">", "");
        let channel = guild.channels.cache.get(channelID);
        if(channel) return channel;
    }
    //Try to search it using name
    channel = guild.channels.cache.find((c) => search.toLowerCase() === c.name.toLowerCase());
    if(channel) return channel;
    //Try to find the channel itself
    channel = guild.channels.cache.get(search);
    return channel;
};

module.exports.resolveMember = async function(search, guild){
    let member = null;
    if(!search || typeof search !== "string") return;
    // Try to search using ID
    if(search.match(/^<@!?(\d+)>$/)){
        const id = search.match(/^<@!?(\d+)>$/)[1];
        member = await guild.members.fetch(id).catch(() => {});
        if(member) return member;
    }
    //Try to search using username
    if(search.match(/^!?(\w+)#(\d+)$/)){
        guild = await guild.fetch();
        member = guild.members.cache.find((m) => m.user.tag === search);
        if(!member){
            member = guild.members.fetch({cache: true}).then(m=>m.find(m=>m.user.tag.toLowerCase() === search.toLowerCase()));
        }
        if(member) return member;
    }
    //Try to find the user itself
    member = await guild.members.fetch(search).catch(() => {});
    return member;
};
