import { UploadDocumentTypes } from "@Pages/AppScreens/Chat/types";

export const ChatItemStyles = {
    true: {
      direction: 'flex-row-reverse',
      detailDirection: 'row',
      background: ' bg-stroke-light',
      fontSize: 13,
      border: 'none',
      textAlign: 'justify-end',
      color: 'text-light-text',
      stopDrag: 'right',
      borderRadius: '10px 10px 0 10px',
      messageAlign: 'self-end',
      marginKey: 'ml',
      boxBorderRadius: 'rounded-tl-[30px] rounded-tr-[30px] rounded-bl-[30px] rounded-br-none',
      replyChatIconStyles: {
        marginKey: 'mr',
        right: -10,
        top: -40,
        zIndex: -1,
        rotate: '-40deg',
      },
    },
    false: {
      direction: 'flex-row',
      stopDrag: 'left',
      detailDirection: 'row-reverse',
      background: 'bg-main-orange',
      fontSize: 11,
      border: '1px solid #E7E7E7',
      textAlign: 'justify-start',
      borderRadius: '10px 10px 10px 0',
      color: ' text-white',
      messageAlign: 'self-start',
      marginKey: 'mr',
      boxBorderRadius: 'rounded-tl-[30px] rounded-tr-[30px] rounded-bl-none rounded-br-[30px]',
      replyChatIconStyles: {
        left: -15,
        rotate: '-130deg',
        scale: '1 -1',
        marginKey: 'ml',
      },
    },
  };

  
export const ChatAllowedFileTypes = {
  document: ['application/pdf'],
  other: ['image/png', 'image/jpg', 'image/jpeg'],
};

export const FileTypes = {
  application: UploadDocumentTypes.Pdf,
  image: UploadDocumentTypes.Image,
  video: UploadDocumentTypes.Video,
};
