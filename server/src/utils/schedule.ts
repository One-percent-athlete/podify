import cron from "node-cron";
import AutoGeneratedPlaylist from "#/models/autoGeneretedPlaylist";
import Audio from "#/models/audio";

const generatedPlaylist = async () => {
  const result = await Audio.aggregate([
    { $sort: { likes: -1 } },
    { $sample: { size: 20 } },
    {
      $group: {
        _id: "$category",
        audios: { $push: "$$ROOT._id" },
      },
    },
  ]);

  result.map(async (item) => {
    await AutoGeneratedPlaylist.updateOne(
      { title: item._id },
      { $set: { items: item.audios } },
      { upsert: true }
    );
  });
};

cron.schedule("0 0 * * *", async () => {
  await generatedPlaylist();
});
