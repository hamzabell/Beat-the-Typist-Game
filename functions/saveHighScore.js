require("dotenv").config();
const Airtable = require("airtable");

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});

const base = Airtable.base(process.env.AIRTABLE_API_BASE);
const table = base(process.env.AIRTABLE_TABLE);

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

  if (!score || !name) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        err: "No Score. Bad Request",
      }),
    };
  }
  try {
    const records = await table
      .select({
        sort: [{ field: "score", direction: "desc" }],
      })
      .firstPage();

    const formattedRecords = records.map((record) => ({
      id: record.id,
      fields: record.fields,
    }));

    const LowestRecord = formattedRecords.slice(-1)[0];

    if (
      typeof LowestRecord.fields.score === "undefined" ||
      score > LowestRecord.fields.score
    ) {
      const updatedRecord = { id: LowestRecord.id, fields: { name, score } };

      await table.update([updatedRecord]);
      return {
        statusCode: 200,
        body: JSON.stringify(updatedRecord),
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({}),
      };
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "failed to save record in Airtable",
      }),
    };
  }
};
