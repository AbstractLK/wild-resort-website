import SideNavigation from "@/app/_components/SideNavigation";

export default function Layout({children}){
    return (
        <div className="grid grid-cols-[16rem_1fr] h-full gap-12">
            <SideNavigation />
            <div className="py-2 mx-10">{children}</div>
        </div>
    )
}