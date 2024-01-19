const {Client} = require("discord.js");
const {successEmbed} = require("../../../utils/embeds");
const {updateGuild} = require("../../../database/queries/guild");
const welcomeCommand = require("../../../commands/admin/welcome");
const logger = require("../../../logger");

jest.mock("discord.js");
jest.mock("../../../logger");
jest.mock("../../../database/queries/guild");

describe("welcome command", () => {
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
        welcome: {
          channel: "987654321",
          message: "Welcome, {user.name}!",
        },
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("set subcommand", () => {
    beforeEach(() => {
      interaction.options.getSubcommand.mockReturnValue("set");
      interaction.options.getChannel.mockReturnValue({id: "123456789"});
      updateGuild.mockReturnValue(data.guild);
    });

    it("should set the welcome channel and send success message", async () => {
      await welcomeCommand.execute(client, interaction, data);

      expect(updateGuild).toHaveBeenCalledWith("123456789", {
        ...data.guild,
        welcome: {
          ...data.guild.welcome,
          channel: "123456789",
        },
      });

      expect(interaction.reply).toHaveBeenCalledWith({
        embeds: [
          successEmbed({
            title: "Welcome channel set",
            description: "Welcome messages will be sent to [object Object]",
          }),
        ],
        ephemeral: false,
      });
    });
  });

  describe("customise subcommand", () => {
    beforeEach(() => {
      interaction.options.getSubcommand.mockReturnValue("customise");
      interaction.options.getString.mockReturnValue(
        "Welcome, {user.name}! Custom message."
      );
      updateGuild.mockReturnValue(data.guild);
    });

    it("should customise the welcome message and send success embed", async () => {
      await welcomeCommand.execute(client, interaction, data);

      expect(updateGuild).toHaveBeenCalledWith("123456789", {
        ...data.guild,
        welcome: {
          ...data.guild.welcome,
          message: "Welcome, {user.name}! Custom message.",
        },
      });

      expect(interaction.reply).toHaveBeenCalledWith({
        embeds: [
          successEmbed({
            title: "Welcome message customised",
            description:
              "Welcome message has been set to:\n\nWelcome, {user.name}! Custom message.",
          }),
        ],
        ephemeral: false,
      });
    });

    it("should reply with an error message if the message is too long", async () => {
      interaction.options.getString.mockReturnValue(
        "Welcome, {user.name}! Custom message.".repeat(100)
      );

      await welcomeCommand.execute(client, interaction, data);

      expect(updateGuild).not.toHaveBeenCalled();

      expect(interaction.reply).toHaveBeenCalledWith({
        content: "The description cannot be longer than 1200 characters.",
        ephemeral: false,
      });
    });
  });

  describe("disable subcommand", () => {
    beforeEach(() => {
      interaction.options.getSubcommand.mockReturnValue("disable");
      updateGuild.mockReturnValue(data.guild);
    });

    it("should disable the welcome channel and message and send success embed", async () => {
      await welcomeCommand.execute(client, interaction, data);

      expect(updateGuild).toHaveBeenCalledWith("123456789", {
        ...data.guild,
        welcome: {
          channel: null,
          message: null,
        },
      });

      expect(interaction.reply).toHaveBeenCalledWith({
        embeds: [
          successEmbed({
            title: "Welcome messages disabled",
            description: "Welcome messages have been disabled.",
          }),
        ],
        ephemeral: false,
      });
    });
  });

  describe("test subcommand", () => {
    beforeEach(() => {
      interaction.options.getSubcommand.mockReturnValue("test");
      interaction.options.getChannel.mockReturnValue({send: jest.fn()});
    });

    it("should send a welcome message to the channel and send success embed", async () => {
      await welcomeCommand.execute(client, interaction, data);

      expect(interaction.guild.channels.cache.get).toHaveBeenCalledWith(
        data.guild.welcome.channel
      );

      expect(interaction.guild.channels.cache.get().send).toHaveBeenCalledWith({
        embeds: [
          successEmbed({
            title: "Welcome!",
            description: "Welcome, test!",
          }),
        ],
      });

      expect(interaction.reply).toHaveBeenCalledWith({
        content: "Test message sent.",
        ephemeral: false,
      });
    });

    it("should reply with an error message if channel is not set", async () => {
      interaction.guild.channels.cache.get.mockReturnValue(null);

      await welcomeCommand.execute(client, interaction, data);

      expect(interaction.reply).toHaveBeenCalledWith({
        content: "The channel is not set.",
        ephemeral: false,
      });
    });
  });

  it("should call logger.error if an error is thrown", async () => {
    interaction.options.getSubcommand.mockImplementation(() => {
      throw new Error("test");
    });

    await welcomeCommand.execute(client, interaction, data);

    expect(logger.error).toHaveBeenCalledWith(
      `Error executing 'welcome' command!`,
      {
        label: "Command",
        message: "test",
        data,
      }
    );
  });

  it("snaphot of interaction data", () => {
    expect(welcomeCommand.interaction).toMatchSnapshot();
  });
});
