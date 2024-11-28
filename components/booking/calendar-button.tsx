import { FC, useRef } from "react";
import {
  AriaButtonProps,
  mergeProps,
  useButton,
  useFocusRing,
} from "react-aria";
import { CalendarState } from "react-stately";
import { Button } from "@/components/ui/button";

interface CalendarButtonProps extends AriaButtonProps<"button"> {
  state?: CalendarState;
  side?: "left" | "right";
}

const CalendarButton: FC<CalendarButtonProps> = (props) => {
  const ref = useRef(null);
  const { buttonProps } = useButton(props, ref);
  const { focusProps } = useFocusRing(props);

  return (
    <Button
      ref={ref}
      variant="outline"
      size="icon"
      disabled={props.isDisabled}
      {...mergeProps(buttonProps, focusProps)}
    >
      {props.children}
    </Button>
  );
};

export default CalendarButton;
