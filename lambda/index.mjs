import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  DeleteCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  console.log("Event:", JSON.stringify(event, null, 2));

  try {
    const method = event.requestContext.http.method;
    const id = event.pathParameters?.id;

    if (method === "GET") {
      const command = new ScanCommand({ TableName: "notes" });
      const data = await docClient.send(command);
      return {
        statusCode: 200,
        body: JSON.stringify(data.Items),
      };
    }

    if (method === "POST") {
      const { title, content } = JSON.parse(event.body);
      if (!title || !content) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Missing title or content" }),
        };
      }

      const note = {
        id: Date.now().toString(),
        title,
        content,
      };

      const command = new PutCommand({
        TableName: "notes",
        Item: note,
      });

      await docClient.send(command);

      return {
        statusCode: 200,
        body: JSON.stringify(note),
      };
    }

    if (method === "DELETE" && id) {
      const command = new DeleteCommand({
        TableName: "notes",
        Key: { id },
      });

      await docClient.send(command);

      return {
        statusCode: 204,
        body: "",
      };
    }

    if (method === "PUT" && id) {
      const { title, content } = JSON.parse(event.body);

      if (!title || !content) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Missing title or content" }),
        };
      }

      const command = new UpdateCommand({
        TableName: "notes",
        Key: { id },
        UpdateExpression: "SET title = :title, content = :content",
        ExpressionAttributeValues: {
          ":title": title,
          ":content": content,
        },
        ReturnValues: "ALL_NEW",
      });

      const result = await docClient.send(command);

      return {
        statusCode: 200,
        body: JSON.stringify(result.Attributes),
      };
    }

    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  } catch (err) {
    console.error("Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
