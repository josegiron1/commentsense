// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Data } from "@/type";
import type { NextApiRequest, NextApiResponse } from "next";
import * as examples from "../../../data";

const refetchIfNextPageToken = async (id: string, nextPageToken: string, items: any[]) => {
    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/commentThreads?videoId=${id}&part=snippet&key=${
                process.env.YOUTUBE_API as string
            }&maxResults=100&pageToken=${nextPageToken}`
        );

        if (!response.ok) {
            console.error("something went wrong");
            return items;
        }
        const data = (await response.json()) as Data;

        data?.items.forEach((item) => {
            items.push(item.snippet.topLevelComment.snippet.textOriginal);
        });

        if (data.nextPageToken) {
            await refetchIfNextPageToken(id, data.nextPageToken, items);
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
    let dataAnalysis;

    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/commentThreads?videoId=${id}&part=snippet&key=${process.env.YOUTUBE_API as string}&maxResults=100`
        );
        console.log(response);
        if (!response.ok) {
            console.log(await response.text());
            throw new Error("something went wrong getting comments");
        }
        const data = (await response.json()) as Data;
        data.items.forEach((item) => {
            items.push(item.snippet.topLevelComment.snippet.textOriginal);
        });
        if (data?.nextPageToken) {
            allItems = await refetchIfNextPageToken(id as string, data.nextPageToken, items);
        }
        console.log(allItems);
        const res = await fetch("https://api.cohere.ai/classify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.COHERE_API as string}`,
            },
            body: JSON.stringify({
                inputs: allItems ? allItems : items,
                examples: examples.data,
                model: "large",
                truncate: "END",
                outputIndicator: "Classify this video comments",
                taskDescription: "Classify these video comments as positive, negative, or neutral",
            }),
        });

        dataAnalysis = await res.json();
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("something went wrong");
    }
    res.status(200).json({ items: dataAnalysis.classifications });
    return;
}
