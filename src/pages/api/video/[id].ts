import { Comment } from "@/type";
import type { NextApiRequest, NextApiResponse } from "next";
import * as examples from "../../../data";

// I thought this would work, but it doesn't. Because there is a limit for the items analysis
// Recursive function to get all the comments from the video
// const refetchIfNextPageToken = async (id: string, nextPageToken: string, items: any[]) => {
//     const response = await fetch(
//         `https://www.googleapis.com/youtube/v3/commentThreads?videoId=${id}&part=snippet&key=${
//             process.env.YOUTUBE_API as string
//         }&maxResults=100&pageToken=${nextPageToken}`
//     );
//     if (!response.ok) {
//         return items;
//     }
//     const data = (await response.json()) as Data;

//     data?.items.forEach((item) => {
//         items.push(item.snippet.topLevelComment.snippet.textOriginal);
//         console.log(item.snippet.topLevelComment.snippet.textOriginal);
//     });

//     if (data.nextPageToken) {
//         await refetchIfNextPageToken(id, data.nextPageToken, items);
//     }

//     return items;
// };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const items: any[] = [];
    let commentsClassifications

    const response = await fetch(
        `https://www.googleapis.com/youtube/v3/commentThreads?videoId=${id}&part=snippet&key=${process.env.YOUTUBE_API as string}&maxResults=100`
    );
    if (!response.ok) {
        console.log(await response.text());
        res.status(500).json({ message: "something went wrong getting comments" });
        return;
    }
    const comments = (await response.json()) as Comment;
    comments.items.forEach((item) => {
        if (items.length >= 75) return;
        items.push(item.snippet.topLevelComment.snippet.textOriginal);
    });

    const commentsAnalyzed = await fetch("https://api.cohere.ai/classify", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.COHERE_API as string}`,
        },
        body: JSON.stringify({
            inputs: items,
            examples: examples.trainingData,
            model: "large",
            truncate: "END",
            outputIndicator: "Classify this video comments",
            taskDescription: "Classify these video comments as positive, negative, or neutral",
        }),
    });

    if (!commentsAnalyzed.ok) {
        res.status(500).json({ message: "something went wrong analyzing comments" });
        return;
    }

    commentsClassifications = await commentsAnalyzed.json();
    res.status(200).json({ items: commentsClassifications.classifications });
}
