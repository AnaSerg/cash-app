import {DashboardItem} from "@/app/ui/components/dashboard-item";


export default async function TargetPage({
                                               params,
                                           }: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    console.log(params);

    return (
        <div>
            <div className="flex gap-2 flex-wrap">
                <div className="w-8 h-8 rounded-3xl bg-[#F39A60] drop-shadow-md" />
                <div className="w-8 h-8 rounded-3xl bg-[#F39A60] drop-shadow-md" />
                <div className="w-8 h-8 rounded-3xl bg-[#F39A60] drop-shadow-md" />
                <div className="w-8 h-8 rounded-3xl bg-[#F39A60] drop-shadow-md" />
                <div className="w-8 h-8 rounded-3xl bg-[#F39A60] drop-shadow-md" />
                <div className="w-8 h-8 rounded-3xl bg-[#F39A60] drop-shadow-md" />
                <div className="w-8 h-8 rounded-3xl bg-[#F39A60] drop-shadow-md" />
                <div className="w-8 h-8 rounded-3xl bg-[#F39A60] drop-shadow-md" />
                <div className="w-8 h-8 rounded-3xl bg-[#EDECEC] drop-shadow-md" />
                <div className="w-8 h-8 rounded-3xl bg-[#EDECEC] drop-shadow-md" />
                <div className="w-8 h-8 rounded-3xl bg-[#EDECEC] drop-shadow-md" />
                <div className="w-8 h-8 rounded-3xl bg-[#EDECEC] drop-shadow-md" />
                <div className="w-8 h-8 rounded-3xl bg-[#EDECEC] drop-shadow-md" />
                <div className="w-8 h-8 rounded-3xl bg-[#EDECEC] drop-shadow-md" />
                <div className="w-8 h-8 rounded-3xl bg-[#EDECEC] drop-shadow-md" />
                <div className="w-8 h-8 rounded-3xl bg-[#EDECEC] drop-shadow-md" />
                <div className="w-8 h-8 rounded-3xl bg-[#EDECEC] drop-shadow-md" />
                <div className="w-8 h-8 rounded-3xl bg-[#EDECEC] drop-shadow-md" />
                <div className="w-8 h-8 rounded-3xl bg-[#EDECEC] drop-shadow-md" />
                <div className="w-8 h-8 rounded-3xl bg-[#EDECEC] drop-shadow-md" />
                <div className="w-8 h-8 rounded-3xl bg-[#EDECEC] drop-shadow-md" />
                <div className="w-8 h-8 rounded-3xl bg-[#EDECEC] drop-shadow-md" />
                <div className="w-8 h-8 rounded-3xl bg-[#EDECEC] drop-shadow-md" />
            </div>
        </div>
    )
}