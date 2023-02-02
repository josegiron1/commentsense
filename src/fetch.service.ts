export const fetcher = (url: string, options: any = { method: "GET"}) => fetch(url, options).then((res) => res.json());

export const getCommentsAnalyze = async (id: string) => {
    try {
        const res = await fetcher(`/api/video/${id}`);
        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
};
