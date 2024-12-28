import DarkLogo from "@Assets/icons/darkLogo.svg";
type HeaderProps = {
    headerTitle: string;
    subTitle: string;
};
export default function AuthHeader({ headerTitle, subTitle }: HeaderProps) {
    return (
        <div className="mb-14 text-center text-[#202224]">
            <div className="mb-8 md:hidden">
                <DarkLogo width={100} height={100}/>
            </div>
            <h1 className="mb-4 text-heading  font-normal ">{headerTitle}</h1>
            <p className="text-large">{subTitle}</p>
        </div>
    );
}
