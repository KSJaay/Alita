const {Client} = require("discord.js");
const {successEmbed} = require("../../../utils/embeds");
const settingsCommand = require("../../../commands/admin/settings");
const logger = require("../../../logger");

jest.mock("discord.js");
jest.mock("../../../logger");

const messageSettings = (setting = {}) => {
  if (!setting.enabled) return "Enabled: ❌";

  const {channel, message} = setting;

  return `Enabled: ✅\nChannel: <#${channel}>\nMessage: ${message}`;
};

describe("settings command", () => {
  const client = new Client();

  let interaction;
  let data;

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
    data = {
      guild: {
        goodbye: {
          channel: "987654321",
          message: "Goodbye, {user.name}!",
        },
        welcome: {
          channel: "123456789",
          message: "Welcome, {user.name}!",
        },
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should reply with a success message", async () => {
    await settingsCommand.execute(client, interaction, data);

    expect(interaction.reply).toHaveBeenCalledWith({
      embeds: [
        successEmbed({
          description: `Use admins commands to change these settings`,
          fields: [
            {
              name: `Welcome settings`,
              value: messageSettings(data.guild.welcome),
              inline: true,
            },
            {
              name: `Goodbye settings`,
              value: messageSettings(data.guild.goodbye),
              inline: true,
            },
          ],
        }),
      ],
    });
  });

  it("should call logger.error if an error is thrown", async () => {
    interaction.reply.mockImplementation(() => {
      throw new Error("test");
    });

    await settingsCommand.execute(client, interaction, data);

    expect(logger.error).toHaveBeenCalledWith(
      `Error executing 'settings' command!`,
      {
        label: "Command",
        message: "test",
        data,
      }
    );
  });

  it("snaphot of interaction data", () => {
    expect(settingsCommand.interaction).toMatchSnapshot();
  });
});
