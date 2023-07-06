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
      logger.error("Error connecting to MongoDB", {
        message: error.message,
      });

      process.exit(1);
    });

  const guilds = await guildSchema.find({}).lean();

  for (const guild of guilds) {
    const {id, addons, prefix} = guild;

    if (addons || prefix) {
      await guildSchema
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
    }
  }

  process.exit(0);
}

migrate();
