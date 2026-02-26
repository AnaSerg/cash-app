import useSWR, {mutate} from "swr";
import {TargetItemProps} from "@/app/targets/types";
import useSWRMutation from "swr/mutation";

export const useTargetApi = () => {
    const fetcher = (url: string) => fetch(url).then(res => res.json());

    const { data: targets, error, isLoading } = useSWR(
        '/api/target',
        fetcher
    );

    const { trigger: addTarget } = useSWRMutation(
        'add-target',
        postTarget,
        {
            onSuccess: () => {
                mutate('/api/target');
            },
        }
    )

    return { addTarget, targets, error, isLoading };
}

async function postTarget (_key: string, { arg }: { arg: TargetItemProps }) {
    try {
        const res = await fetch('/api/target', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(arg)
        })
        return res.json();
    } catch {
        throw new Error('Failed to add target');
    }
}