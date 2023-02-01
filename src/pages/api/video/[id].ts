// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Data } from "@/type";
import type { NextApiRequest, NextApiResponse } from "next";

const refetchIfNextPageToken = async (id: string, nextPageToken: string, items: any[]) => {
    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/commentThreads?videoId=${id}&part=snippet&key=${
                process.env.YOUTUBE_API as string
            }&maxResults=100&pageToken=${nextPageToken}`
        );

        if (!response.ok) {
            throw new Error(await response.text());
        }
        const data = (await response.json()) as Data;

        data?.items.forEach((item) => {
            items.push(item.snippet.topLevelComment.snippet.textOriginal);
        });

        const newItems = [...items];

        if (data?.nextPageToken) {
            await refetchIfNextPageToken(id, data.nextPageToken, newItems);
        }
        return items;
    } catch (error) {
        console.log(error);
    }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const items: any[] = [];
    let allItems;

    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/commentThreads?videoId=${id}&part=snippet&key=${process.env.YOUTUBE_API as string}&maxResults=100`
        );
        if (!response.ok) {
            console.log(await response.text());
            return;
        }
        const data = (await response.json()) as Data;
        data.items.forEach((item) => {
            items.push(item.snippet.topLevelComment.snippet.textOriginal);
        });
        if (data?.nextPageToken) {
            allItems = await refetchIfNextPageToken(id as string, data.nextPageToken, items)
            console.log(allItems);
        } else {
            console.log(items);
        }

        
    } catch (error) {
        console.log(error);
    }
    res.status(200).json({ id });
    return;
}
