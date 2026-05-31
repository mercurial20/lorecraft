import { Spin, type SpinProps } from "antd";
import clsx from "clsx";
import type { ReactNode } from "react";

import styles from "./Spinner.module.scss";

type SpinnerVariant = "block" | "fill" | "inline";

interface SpinnerProps {
  className?: string;
  indicator?: SpinProps["indicator"];
  label?: ReactNode;
  size?: SpinProps["size"];
  variant?: SpinnerVariant;
}

const Spinner = ({
  className,
  indicator,
  label,
  size,
  variant = "block",
}: SpinnerProps) => {
  return (
    <div
      className={clsx(styles.spinner, styles[variant], className)}
      role="status"
      aria-label={typeof label === "string" ? label : "Loading"}
    >
      <span className={styles.content}>
        <Spin indicator={indicator} size={size} />
        {label ? <span className={styles.label}>{label}</span> : null}
      </span>
    </div>
  );
};

export { Spinner };
