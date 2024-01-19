const {Client} = require("discord.js");
const rpsCommand = require("../../../commands/fun/rps");
const logger = require("../../../logger");

jest.mock("discord.js");
jest.mock("../../../logger");

describe("rps command", () => {
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

    interaction.options.getString.mockReturnValue("rock");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should reply with a success message", async () => {
    await rpsCommand.execute(client, interaction, {});

    expect(interaction.reply).toHaveBeenCalledWith(
      expect.objectContaining({
        embeds: [expect.any(Object)],
        ephemeral: false,
      })
    );
  });

  it("should call logger.error if an error is thrown", async () => {
    interaction.reply.mockImplementation(() => {
      throw new Error("test");
    });

    await rpsCommand.execute(client, interaction, {});

    expect(logger.error).toHaveBeenCalledWith(
      `Error executing 'rps' command!`,
      {
        label: "Command",
        message: "test",
        data: {},
      }
    );
  });

  it("snaphot of interaction data", () => {
    expect(rpsCommand.interaction).toMatchSnapshot();
  });
});
