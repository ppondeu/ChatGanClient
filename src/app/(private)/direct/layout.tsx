import { Inbox } from "@/components";

type LayoutProps = {
    children: React.ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
    return (
        <div className="flex gap-2 bg-[#f7f7f3] overflow-hidden">
            <Inbox className="flex-[0.33] min-h-[100dvh]" />
            {children}
        </div>
    );
}