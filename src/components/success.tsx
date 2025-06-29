import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function success({ children }: Props) {
  return (
    <p style={{ color: "var(--success)" }}>
      {children}
    </p>
  );
}
