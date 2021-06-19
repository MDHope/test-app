import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface CardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  id: string;
  image: string;
  title: string;
}