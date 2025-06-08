import { cva } from 'class-variance-authority';
import type { ComponentProps, ElementType } from 'react';

export type StyledProps<C extends ElementType> = ComponentProps<C> & {
  as?: ElementType;
};

export type RefType<C extends ElementType> =
  C extends keyof React.JSX.IntrinsicElements
    ? React.JSX.IntrinsicElements[C] extends React.DOMAttributes<infer E>
      ? E
      : never
    : // eslint-disable-next-line @typescript-eslint/no-explicit-any -- expected
    React.ComponentType<any> extends React.ComponentType<infer Instance>
    ? Instance
    : never;

export interface StyledComponentType<C extends ElementType>
  extends React.ForwardRefExoticComponent<
    StyledProps<C> & React.RefAttributes<RefType<C>>
  > {
  baseClassName?: string;
}

export interface CVAConfig<CVASchema> {
  cva?: Parameters<typeof cva<CVASchema>>[1];
}