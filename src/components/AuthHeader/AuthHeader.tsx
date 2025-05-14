import DarkLogo from "@Assets/icons/darkLogo.svg";
type HeaderProps = {
    headerTitle: string;
    subTitle: string;
};
export default function AuthHeader({ headerTitle, subTitle }: HeaderProps) {
    return (
        <div className="mb-8 text-[#202224] dark:text-white text-center">
            <div className="mb-8 md:hidden">
                <DarkLogo width={100} height={100}/>
            </div>
            <h1 className="mb-4 text-heading font-normal text-[#202224] dark:text-white">{headerTitle}</h1>
            <p className="text-large text-[#717171] dark:text-gray-300">{subTitle}</p>
        </div>
    );
}
