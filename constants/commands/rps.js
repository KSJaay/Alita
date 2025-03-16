const randomRpsMessages = [
  "Boom! {winner} read your move like a book and won! 📖",
  "Oof, that was brutal! {winner} absolutely dominated! 😈",
  "Did you even try? {winner} makes it look easy! 😆",
  "Outplayed, outmatched, outclassed! {winner} takes the win! 🔥",
  "No contest! {winner} completely outplayed their opponent! 👏",
  "A calculated win! {winner} had the perfect strategy! 🧠",
  "That's game! {winner} proves they're the better player! 🎮",
  "Did you see that? {winner} just schooled their opponent! 😆",
  "Better luck next time! {winner} wasn't messing around! 😏",
  "Congratulations, {winner}! You beat {loser} in a thrilling match of Rock, Paper, Scissors!",
  "Victory goes to {winner}! Your move outsmarted {loser}.",
  "Well played, {winner}! {loser} couldn't keep up with your strategy.",
  "Champion {winner} wins the round, {loser} was no match for you!",
  "{winner} emerges victorious over {loser}! Excellent game.",
  "Tough luck, {loser}. {winner} outplayed you this time. Better luck next round!",
  "Don't be discouraged, {loser}, {winner} got the upper hand this round.",
  "Keep practicing, {loser}. {winner} managed to beat you soundly today.",
  "Better luck next time, {loser}! {winner} showed some serious skill.",
  "Ouch, {loser}! {winner} dominated this match.",
  "Congratulations {winner}! Your skill and timing left {loser} in the dust!",
  "Victory is sweet, {winner}! {loser} just couldn't match your prowess.",
  "Bravo {winner}! A spectacular win over {loser}.",
  "Kudos to {winner} for outsmarting {loser} in this epic battle!",
  "You're unstoppable, {winner}! {loser} never saw that move coming.",
  "Hats off to you, {winner}! A flawless win against {loser}.",
  "Well done, {winner}! {loser} was no match for your winning strategy.",
  "Impressive win, {winner}! {loser} tried, but your move was just too strong.",
  "Victory achieved! {winner}'s clever play triumphed over {loser}.",
  "You rocked it, {winner}! {loser} couldn't keep up with your game.",
  "Tough round, {loser}. {winner} got the better of your move this time.",
  "Don't let it get you down, {loser}. {winner} made a killer move!",
  "It's all in the game, {loser}. {winner} outplayed you today.",
  "Ouch, {loser}! {winner} was simply too clever this round.",
  "Chin up, {loser}. {winner} showed some impressive skill.",
  "Every loss is a lesson, {loser}. {winner} earned that win fair and square.",
  "Better luck next time, {loser}. {winner} nailed the winning move.",
  "Not your day, {loser}. {winner} was on fire!",
  "Keep practicing, {loser}. {winner}'s win was well-deserved.",
  "You'll get 'em next time, {loser}. {winner} outplayed you this match.",
];

const botWinnerMessages = [
  "Better luck next time, I'm just too good for you!",
  "Oh honey, I just schooled you. Try harder next time!",
  "Guess what? I win again. You should really work on your game.",
  "I didn't come here to play, I came here to win. And win I did!",
  "Sorry not sorry, your defeat was inevitable when facing me.",
  "I just served you a masterclass, sorry but winning is my specialty!",
  "Did you really think you had a chance? I make victory look effortless!",
  "Oh darling, I'm on fire today. Better catch up next time!",
  "Victory is my middle name. Looks like you got schooled again!",
  "I'm not just playing, I'm dominating. Try to keep up next time!",
];
const botLoserMessages = [
  "Ugh, I lost? You must be having a lucky day, but don't get used to it!",
  "Alright, you got me this round. Enjoy it while it lasts, I'm coming back!",
  "I can't believe it, defeated by you. Consider this a temporary setback for me.",
  "You beat me fair and square. Just remember, every champion has an off day!",
  "Okay, you win this time. I hope you're ready, because next round I'll be bringing the sass!",
  "I lost? Must be one of those rare off days. Enjoy your moment!",
  "Surprise! Even I can have a slip-up. Relish this win while it lasts!",
  "You managed to snag a win today, consider it a temporary win, though!",
  "I may have lost this time, but mark my words, my comeback will be epic!",
];

const getBotMessage = (isWinner) => {
  const messages = isWinner ? botWinnerMessages : botLoserMessages;
  return messages[Math.floor(Math.random() * messages.length)];
};

module.exports = {
  randomRpsMessages,
  getBotMessage,
};
