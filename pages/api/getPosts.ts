import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = `${process.env.WORDPRESS_URL}`;
  const data = {
    query: `
    query getPosts {
      posts {
        edges {
          node {
            id
            content
            title
            status
            uri
            excerpt
            date
            databaseId
          }
        }
      }
    }`,
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const resData = await axios.post(url, data, config);
    return res.status(200).json(resData.data);
  } catch (error) {
    return res.status(500).json(error);
  }
}
