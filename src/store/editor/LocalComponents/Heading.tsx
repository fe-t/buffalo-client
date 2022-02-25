import React, { FC, HTMLAttributes, ReactNode } from "react";

interface Props {
  content: ReactNode;
  level?: number; // 1 ~ 5
  textAlign?: string;
}
type NativeAttrs = Omit<HTMLAttributes<any>, keyof Props>;
export type HeadingProps = Props & NativeAttrs;

export const Heading: FC<HeadingProps> = ({
  content,
  level = 3,
  textAlign = "left",
  style,
  ...props
}) => {
  const HeadTag = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <HeadTag style={{ ...style, textAlign: textAlign as any }} {...props}>
      {content}
    </HeadTag>
  );
};
