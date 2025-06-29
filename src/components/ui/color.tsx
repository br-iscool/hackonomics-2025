import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Color({ children }: Props) {
  return (
    <span style={{ color: "var(--success)" }}>
      <b>{children}</b>
    </span>
  );
}
