import type { ElementType, ComponentPropsWithRef } from 'react'

export type AnyEl = ElementType

export type PolymorphicProps<E extends AnyEl, P = {}> = P &
  Omit<ComponentPropsWithRef<E>, keyof P | 'as'> & { as?: E }
