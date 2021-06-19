import { DetailedHTMLProps, Dispatch, HTMLAttributes, SetStateAction } from "react";

export interface ReaderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  content: string;
  title: string;
  onBackClick: Dispatch<SetStateAction<boolean>>;
  isRead: boolean;
}