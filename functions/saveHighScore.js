const { table, getHighScores } = require("./utils/airtable");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({
        err: "That method is not allowed",
      }),
    };
  }

  const { score, name } = JSON.parse(event.body);

  if (typeof score === "undefined" || !name) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        err: "No Score. Bad Request",
      }),
    };
  }
  try {
    const records = await getHighScores(false);

    const LowestRecord = records.slice(-1)[0];

    if (
      typeof LowestRecord.fields.score === "undefined" ||
      score > LowestRecord.fields.score
    ) {
      const updatedRecord = { id: LowestRecord.id, fields: { name, score } };

      await table.update([updatedRecord]);
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Hey you just enter the leaderboard!",
          data: updatedRecord,
        }),
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Sorry, you didn't do enough to enter the leaderboard",
        }),
      };
    }
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "failed to save record in Airtable",
      }),
    };
  }
};
