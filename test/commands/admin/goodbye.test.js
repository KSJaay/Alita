const {Client} = require("discord.js");
const {successEmbed} = require("../../../utils/embeds");
const {updateGuild} = require("../../../database/queries/guild");
const goodbyeCommand = require("../../../commands/admin/goodbye");
const logger = require("../../../logger");

jest.mock("discord.js");
jest.mock("../../../logger");
jest.mock("../../../database/queries/guild");

describe("goodbye command", () => {
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

    it("should set the goodbye channel and send success message", async () => {
      await goodbyeCommand.execute(client, interaction, data);

      expect(updateGuild).toHaveBeenCalledWith("123456789", {
        ...data.guild,
        goodbye: {
          ...data.guild.goodbye,
          channel: "123456789",
        },
      });

      expect(interaction.reply).toHaveBeenCalledWith({
        embeds: [
          successEmbed({
            title: "Goodbye channel set",
            description: "Goodbye messages will be sent to [object Object]",
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
        "Goodbye, {user.name}! Custom message."
      );
      updateGuild.mockReturnValue(data.guild);
    });

    it("should customise the goodbye message and send success embed", async () => {
      await goodbyeCommand.execute(client, interaction, data);

      expect(updateGuild).toHaveBeenCalledWith("123456789", {
        ...data.guild,
        goodbye: {
          ...data.guild.goodbye,
          message: "Goodbye, {user.name}! Custom message.",
        },
      });

      expect(interaction.reply).toHaveBeenCalledWith({
        embeds: [
          successEmbed({
            title: "Goodbye message customised",
            description:
              "Goodbye message has been set to:\n\nGoodbye, {user.name}! Custom message.",
          }),
        ],
        ephemeral: false,
      });
    });

    it("should reply with an error message if the message is too long", async () => {
      interaction.options.getString.mockReturnValue(
        "Goodbye, {user.name}! Custom message.".repeat(100)
      );

      await goodbyeCommand.execute(client, interaction, data);

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

    it("should disable the goodbye channel and message and send success embed", async () => {
      await goodbyeCommand.execute(client, interaction, data);

      expect(updateGuild).toHaveBeenCalledWith("123456789", {
        ...data.guild,
        goodbye: {
          channel: null,
          message: null,
        },
      });

      expect(interaction.reply).toHaveBeenCalledWith({
        embeds: [
          successEmbed({
            title: "Goodbye messages disabled",
            description: "Goodbye messages will no longer be sent.",
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

    it("should send a goodbye message to the channel and send success embed", async () => {
      await goodbyeCommand.execute(client, interaction, data);

      expect(interaction.guild.channels.cache.get).toHaveBeenCalledWith(
        data.guild.goodbye.channel
      );

      expect(interaction.guild.channels.cache.get().send).toHaveBeenCalledWith({
        embeds: [
          successEmbed({
            title: "Goodbye!",
            description: "Goodbye, test!",
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

      await goodbyeCommand.execute(client, interaction, data);

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

    await goodbyeCommand.execute(client, interaction, data);

    expect(logger.error).toHaveBeenCalledWith(
      `Error executing 'goodbye' command!`,
      {
        label: "Command",
        message: "test",
        data,
      }
    );
  });

  it("snaphot of interaction data", () => {
    expect(goodbyeCommand.interaction).toMatchSnapshot();
  });
});
