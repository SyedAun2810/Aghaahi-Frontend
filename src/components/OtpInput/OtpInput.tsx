import React, { useState, useRef, ChangeEvent, KeyboardEvent } from "react";

interface OTPInputProps {
  length?: number;
  setOTP: (n: string[]) => void;
  otp: string[];
}

const OTPInput: React.FC<OTPInputProps> = ({ length = 6, otp, setOTP }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const inputRefs = useRef<HTMLInputElement[]>(new Array(length).fill(null));

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);

      if (value && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && index > 0 && !otp[index]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData?.getData("text/plain").trim();
    if (
      /^\d*$/.test(pasteData as string) &&
      (pasteData as string).length <= length
    ) {
      const newOTP = (pasteData as string).split("").slice(0, length);
      setOTP(newOTP);
    }
  };

  const handleFocus = (index: number) => {
    setActiveIndex(index);
  };

  const handleBlur = () => {
    setActiveIndex(null);
  };

  return (
    <div className="flex flex-nowrap justify-center items-center">
      {otp.map((value, index) => (
        <React.Fragment key={index}>
          <input
            type="text"
            maxLength={1}
            value={value}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            onFocus={() => handleFocus(index)}
            onBlur={handleBlur}
            ref={(input) =>
              (inputRefs.current[index] = input as HTMLInputElement)
            }
            className={`text-center px-[16px] py-[10px] otp-input ${
              activeIndex === index ? "active" : ""
            }`}
          />
          {index < length - 1 && (
            <span className="mx-4 font-extrabold text-xl text-[#717171]">
              .
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default OTPInput;
