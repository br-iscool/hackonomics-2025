import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function M({ children }: Props) {
  return (
    <span style={{ color: "var(--success)" }}>
      <b>{children}</b>
    </span>
  );
}
