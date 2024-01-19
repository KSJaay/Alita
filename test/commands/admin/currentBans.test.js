const {Client} = require("discord.js");
const {successEmbed} = require("../../../utils/embeds");
const currentbansCommand = require("../../../commands/admin/currentBans");
const logger = require("../../../logger");

jest.mock("discord.js");
jest.mock("../../../logger");

describe("currentbans command", () => {
  const client = new Client();
  const fakeBansData = {
    size: 2,
    map: jest.fn().mockReturnValue([
      {
        user: {
          id: "123456789",
          username: "test",
        },
      },
      {
        user: {
          id: "987654321",
          username: "test",
        },
      },
    ]),
  };

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
        bans: {
          fetch: jest.fn(),
        },
      },
      user: {
        id: "987654321",
        username: "test",
      },
    };

    interaction.guild.bans.fetch.mockResolvedValue(fakeBansData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should reply with a success message", async () => {
    await currentbansCommand.execute(client, interaction, {});

    expect(interaction.reply).toHaveBeenCalledWith({
      embeds: [
        successEmbed({
          description: `Current bans: ${fakeBansData.size}\n${fakeBansData
            .map((ban) => `${ban.user.tag} (${ban.user.id})`)
            .join("\n")
            .slice(0, 1948)}`,
        }),
      ],
    });
  });

  it("should call logger.error if an error is thrown", async () => {
    interaction.reply.mockImplementation(() => {
      throw new Error("test");
    });

    await currentbansCommand.execute(client, interaction, {});

    expect(logger.error).toHaveBeenCalledWith(
      `Error executing 'currentbans' command!`,
      {
        label: "Command",
        message: "test",
        data: {},
      }
    );
  });

  it("snaphot of interaction data", () => {
    expect(currentbansCommand.interaction).toMatchSnapshot();
  });
});
