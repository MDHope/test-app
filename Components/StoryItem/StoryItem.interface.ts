import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface StoryItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  image: string;
  description: string;
  title: string;
  content: string;
}