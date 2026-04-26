import useSWR from "swr";

export const useCategoryByIdApi = (id: number) => {
    const fetcher = (url: string) => fetch(url).then(res => res.json());
    return useSWR(`/api/category/${id}`, fetcher, {
        revalidateOnFocus: false,
    });
};