const {Client} = require("discord.js");
const eightballCommand = require("../../../commands/fun/8ball");
const logger = require("../../../logger");

jest.mock("discord.js");
jest.mock("../../../logger");

describe("8ball command", () => {
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
    await eightballCommand.execute(client, interaction, {});

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

    await eightballCommand.execute(client, interaction, {});

    expect(logger.error).toHaveBeenCalledWith(
      `Error executing '8ball' command!`,
      {
        label: "Command",
        message: "test",
        data: {},
      }
    );
  });

  it("snaphot of interaction data", () => {
    expect(eightballCommand.interaction).toMatchSnapshot();
  });
});
