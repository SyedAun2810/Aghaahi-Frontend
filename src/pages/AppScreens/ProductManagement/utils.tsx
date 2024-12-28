import { compressedImagesType, serverImageType } from "../../ProductTypes";

export const modifyAndKeepCompressedImages = (images: serverImageType[]) => {
    let compressedImages = [] as compressedImagesType[];
    if (images.length) {
        compressedImages = images?.map((item: any, index: number) => ({
            id: index + 1,
            img: item?.compressed
        }));
    }
    return compressedImages;
};

export const validationsForNumbers = (value: number, max: number, min: number, field: string) => {
    if (value < min) {
        return Promise.reject(`${field} can't be less than ${min}.`);
    } else if (value > max) {
        return Promise.reject(`${field} can't be greater than ${max}.`);
    } else {
        return Promise.resolve();
    }
};

export function calculateBoxLength(data: any) {
    let sum = 0;
    data?.forEach((el: any) => {
        if (el) sum++;
    });
    return sum;
}
