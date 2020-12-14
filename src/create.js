import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.tableName,
        Item: {
            userId: "123",
            noteId: uuid.v1(),
            content: data.content,
            attachment: data.attachment, //the s3 object name
            createdAt: Date.now()
        },
    };
    await dynamoDb.put(params);
    return params.Item;
});