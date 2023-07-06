const dotenv = require("dotenv");
const mongoose = require("mongoose");
const guildSchema = require("../database/schema/guild");
const logger = require("../logger");

dotenv.config();

async function migrate() {
  await mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((error) => {
      console.log("Error connecting to MongoDB", error);

      process.exit(1);
    });

  const guilds = await guildSchema.find({}).lean();

  for (const guild of guilds) {
    const {id, addons, prefix} = guild;

    if (addons || prefix) {
      const newGuild = await guildSchema
        .findOneAndUpdate(
          {id},
          {
            $unset: {
              addons: 1,
              prefix: 1,
            },
            goodbye: addons?.goodbye,
            welcome: addons?.welcome,
          },
          {
            overwrite: true,
          }
        )
        .catch((error) => {
          logger.error(`error migrating guild ${id}`, {
            message: error.message,
          });
        });
      console.log({newGuild});
    }
  }

  process.exit(0);
}

migrate();
