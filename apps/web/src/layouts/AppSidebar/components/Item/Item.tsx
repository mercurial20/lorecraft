import { Tooltip } from "antd";
import clsx from "clsx";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactNode,
} from "react";

import styles from "./Item.module.scss";

type AppSidebarItemVariant = "default" | "profile";

interface AppSidebarItemProps
  extends Omit<ComponentPropsWithoutRef<"button">, "children"> {
  active?: boolean;
  collapsed?: boolean;
  description?: ReactNode;
  icon: ReactNode;
  label: ReactNode;
  suffix?: ReactNode;
  tooltip?: ReactNode;
  variant?: AppSidebarItemVariant;
}

const AppSidebarItem = forwardRef<HTMLButtonElement, AppSidebarItemProps>(
  (
    {
      active = false,
      collapsed = false,
      className,
      description,
      icon,
      label,
      suffix,
      tooltip,
      type = "button",
      variant = "default",
      ...buttonProps
    },
    ref,
  ) => {
    const button = (
      <button
        {...buttonProps}
        ref={ref}
        type={type}
        className={clsx(
          styles.item,
          active && styles.itemActive,
          collapsed && styles.itemCollapsed,
          variant === "profile" && styles.itemProfile,
          className,
        )}
      >
        <span className={styles.iconSlot}>{icon}</span>
        <span className={styles.label}>
          {variant === "profile" ? (
            <>
              <span className={styles.title}>{label}</span>
              {description ? (
                <span className={styles.description}>{description}</span>
              ) : null}
            </>
          ) : (
            label
          )}
        </span>
        {suffix ? <span className={styles.suffix}>{suffix}</span> : null}
      </button>
    );

    if (!tooltip) {
      return button;
    }

    return (
      <Tooltip title={collapsed ? tooltip : undefined} placement="right">
        {button}
      </Tooltip>
    );
  },
);

AppSidebarItem.displayName = "AppSidebarItem";

export { AppSidebarItem };
