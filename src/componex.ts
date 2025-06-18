import { ComponentProps, ElementType, createElement, forwardRef } from "react";
import cn from "./helpers/cn";
import { CVAConfig, RefType, StyledComponentType, StyledProps } from "./types";
import { cva, VariantProps } from "class-variance-authority";

const componex = <
  C extends ElementType,
  BaseProps extends Partial<ComponentProps<C>>,
  CVASchema
>(
  component: C,
  {
    className: newBaseClassName,
    cva: cvaConfig,
    ...baseProps
  }: BaseProps & CVAConfig<CVASchema> = {} as BaseProps & CVAConfig<CVASchema>
) => {
  // Get the baseClassName from the component if it exists
  const componentBaseClassName =
    typeof component === "function" && "baseClassName" in component
      ? (component as StyledComponentType<C>).baseClassName
      : "";

  // Combine the base styles of the component and the new styles
  const mergedBaseClassName = cn(componentBaseClassName, newBaseClassName);
  const cvaInit = cva<CVASchema>([mergedBaseClassName], cvaConfig);

  const StyledComponent = forwardRef<
    RefType<C>,
    Omit<StyledProps<C>, keyof BaseProps> &
      Partial<BaseProps> &
      VariantProps<typeof cvaInit>
  >(function StyledComponent(props, ref) {
    const filteredPropsWithoutCVA = Object.entries(props).reduce(
      (acc, [key, value]) =>
        cvaConfig?.variants?.[key] ? acc : { ...acc, [key]: value },
      {} as Record<string, unknown>
    );
    const Component = "as" in props ? props.as : component;
    return createElement(Component as ElementType, {
      ...baseProps,
      ...filteredPropsWithoutCVA,
      ref,
      className: cn(cvaInit(props as unknown as Parameters<typeof cvaInit>[0])),
    });
  });
  const typedStyledComponent = StyledComponent;

  // Attach the combined baseClassName to the new component
  (typedStyledComponent as StyledComponentType<C>).baseClassName =
    mergedBaseClassName;

  return typedStyledComponent;
};

export default componex;
