import SideNavigation from "@/app/_components/SideNavigation";

export default function Layout({children}){
    return (
        <div className="flex flex-col md:grid md:grid-cols-[16rem_1fr] h-full md:gap-6 lg:gap-12">
            <SideNavigation />
            <div className="py-2 px-4 md:px-6 lg:mx-10">{children}</div>
        </div>
    )
}