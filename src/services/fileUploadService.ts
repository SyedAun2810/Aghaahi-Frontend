import { UploadedFile } from "@Components/Inputs/FileUpload";
import dayjs from "dayjs";
import { UseFormReturn } from "react-hook-form";
import NotificationService from "./NotificationService";
import { ChatMediaType } from "@Pages/AppScreens/Chat/types";

function uploadFileToAzure(file: File) {
  // to implement in beta
}

function deleteFile({ indexToDel, setField, fieldName, value }: DelFileProps) {
  if (indexToDel !== 0 && !indexToDel) return setField(fieldName, []);

  const filteredFiles = value.filter((_file, index) => index !== indexToDel);
  setField(fieldName, filteredFiles);
}

function makeBase64(files: File[]) {
  return files.map((file, index) => ({
    url: URL.createObjectURL(file),
    name: file.name,
    size: getSizeToShow(file.size),
    file,
    id: `${dayjs().unix()}${index}`,
  }));
}

const imageValidations = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
      NotificationService.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
      NotificationService.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

function getSizeToShow(size: number) {
  const sizeInKb = size / 1024;
  if (sizeInKb < 1024) {
    return `${sizeInKb.toFixed(2)} KB`;
  }
  const sizeInMb = sizeInKb / 1024;
  return `${sizeInMb.toFixed(2)} MB`;
}

export async function fileUploadCall(file: any, url?: any) {
  // to implement in beta
}

function handleChangeUploadingState({
  value,
  onChange,
  url = "",
  id,
}: {
  value: UploadedFile[];
  onChange: (value: UploadedFile[]) => void;
  url?: string;
  id: number;
}) {
  if (!url) {
    value[id].error = true;
  }

  value[id].uploading = false;
  value[id].url = url;
  onChange(value);
}

export async function retryUpload({
  value,
  fieldName,
  id,
  setField,
}: {
  fieldName: string;
  value: UploadedFile[];
  id: number;
  setField: UseFormReturn["setValue"];
}) {
  //   value[id].uploading = true;
  //   setField(fieldName, value);
  //   const data = await fileUploadCall(value[id].file);
  //   let url = data?.Obituary?.ImageUrl;
  //   if (url) {
  //     value[id].error = false;
  //     value[id].retryNumber = (value[id]?.retryNumber ?? 0) + 1;
  //   }
  //   value[id].url = url;
  //   value[id].uploading = false;
  //   setField(fieldName, value);
}
function checkFileValidity({
  filesInArray,
  value,
  limit = 0,
  allowedFileTypes,
  withoutExtension = false,
  allowOnly,
}: CheckFileValidityProps) {

  if (
    Boolean(limit) &&
    (filesInArray.length > limit ||
      (value?.length ?? 0) + filesInArray.length > limit)
  ) {
    NotificationService.error(`You can upload only ${limit} files`);
    return false;
  }

  if (
    allowOnly &&
    !filesInArray.every(
      (file: { [key: string]: any }) => file.type.split("/")[0] === allowOnly
    )
  ) {
    NotificationService.error(`Invalid File Type, only ${allowOnly} is allowed `);
    return false;
  }
  if (
    allowedFileTypes &&
    !filesInArray.every((file: { [key: string]: any }) =>
      file.type === 'image/jpeg' && !file.name.toLowerCase().endsWith('.jfif'))
  ) {
    NotificationService.error(
      `Invalid File Type  only ${allowedFileTypes
        .map((type) => type.split("/")[1])
        .join(", ")} files are allowed `
    );
    return false;
  }
  if (
    allowedFileTypes &&
    !filesInArray.every((file: { [key: string]: any }) =>
      allowedFileTypes?.includes(
        withoutExtension ? file.type.split("/")[0] : file.type
      )
    ) 
  ) {
    NotificationService.error(
      `Invalid File Type  only ${allowedFileTypes
        .map((type) => type.split("/")[1])
        .join(", ")} files are allowed `
    );
    return false;
  }
  return true;
}

function getFileType(type: string) {
  type = type.split('/')[0];
  return ChatMediaType[type as keyof typeof ChatMediaType];
}

type DelFileProps = {
  fieldName: string;
  value: UploadedFile[];
  setField: UseFormReturn<any>["setValue"];
  indexToDel?: number;
};

type CheckFileValidityProps = {
  filesInArray: { [key: string]: any }[];
  value?: UploadedFile[];
  limit?: number;
  withoutExtension?: boolean;
  allowedFileTypes?: string[];
  allowOnly?: string;
};

export {
  makeBase64,
  deleteFile,
  checkFileValidity,
  handleChangeUploadingState,
  imageValidations,
  getFileType
};
