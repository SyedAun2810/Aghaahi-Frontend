type ColorBoxPropType = { className?: string; bgColor?: string };

const ColorBox = ({ className, bgColor = "" }: ColorBoxPropType) => {
    return <div className={`${className}`} style={{ backgroundColor: bgColor }}></div>;
};

export default ColorBox;
