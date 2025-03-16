# AlitaBot (Another Multi-Purpose Discord Bot)

A simple bot created to show the possibilities of coding using Discord.js API to create features. Will be getting more Advance over time.

## 🚀 Getting Started

Make sure you have the following applications installed and tokens registered before starting:

1. You need to install [Node.js](https://nodejs.org/en/) v22.14.0 or higher and [MongoDB](https://www.mongodb.com/).
2. Clone the repository https://github.com/KSJaay/Alita.git
3. Register for a Discord bot token using this **[Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#your-token)**
4. PM2 - Is an optional module

### Before starting

Before you start the bot you'll need to change the name of `config.sample.json` to `config.json` and then add your bots token along with the API keys required for some of the features. If you do not want get specific API keys, don't add them to config.json and the command will be automatically disabled.

### Clone application

```
git clone https://github.com/KSJaay/Alita.git
cd Alita
```

### Setup application

```
# Install dependencies
npm install

# Start application using scripts
npm run start

# Alternatively start application using
node index.js
```

## Support

If you have any issues with the code, please open an issue by [clicking here](https://github.com/KSJaay/Alita/issues)

## Current Commands

### Economy

| Name          | Description                           |
| ------------- | ------------------------------------- |
| `Leaderboard` | Show the leaderboard of the server    |
| `Search`      | Search around the house for some cash |

### Games

| Name        | Description                                     |
| ----------- | ----------------------------------------------- |
| `8ball`     | Ask the magic 8ball a question                  |
| `Coinflip`  | Flip a coin and bet on the outcome              |
| `Dice`      | Roll a dice and bet on the outcome              |
| `Rps`       | Play a game of rock-paper-scissors              |
| `Slots`     | Play a game of slots                            |
| `Tictactoe` | Play a game of tic-tac-toe against another user |

### General

| Name    | Description         |
| ------- | ------------------- |
| `Help`  | Open a lootbox      |
| `Panda` | A random panda fact |
