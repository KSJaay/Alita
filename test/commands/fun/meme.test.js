const {Client} = require("discord.js");
const memeCommand = require("../../../commands/fun/meme");
const logger = require("../../../logger");
const Reddit = require("../../../utils/reddit");
const {successEmbed} = require("../../../utils/embeds");

jest.mock("discord.js");
jest.mock("../../../logger");
jest.mock("../../../utils/reddit", () => {
  class reddit {
    random() {
      return {
        title: "test",
        url: "https://test.com/r/test/comments/123456.png",
        permalink: "https://test.com/r/test/comments/123456",
        subreddit_name_prefixed: "r/test",
      };
    }
  }

  return reddit;
});

describe("meme command", () => {
  const client = new Client();

  let interaction;

  beforeEach(() => {
    interaction = {
      options: {
        getSubcommand: jest.fn(),
        getChannel: jest.fn(),
        getString: jest.fn(),
      },
      guildId: "123456789",
      reply: jest.fn(),
      guild: {
        channels: {
          cache: {
            get: jest.fn().mockReturnValue({send: jest.fn()}),
          },
        },
      },
      user: {
        id: "987654321",
        username: "test",
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should reply with a success message", async () => {
    await memeCommand.execute(client, interaction, {});

    expect(interaction.reply).toHaveBeenCalledWith({
      embeds: [
        successEmbed({
          title: "Dank memes",
          url: "https://test.com/r/test/comments/123456",
          description: "test",
          image: {
            url: "https://test.com/r/test/comments/123456.png",
          },
        }),
      ],
    });
  });

  it("should call logger.error if an error is thrown", async () => {
    interaction.reply.mockImplementation(() => {
      throw new Error("test");
    });

    await memeCommand.execute(client, interaction, {});

    expect(logger.error).toHaveBeenCalledWith(
      `Error executing 'meme' command!`,
      {
        label: "Command",
        message: "test",
        data: {},
      }
    );
  });

  it("snaphot of interaction data", () => {
    expect(memeCommand.interaction).toMatchSnapshot();
  });
});
