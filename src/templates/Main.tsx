import type { ReactNode } from "react";

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
  background?: string;
};

const Main = (props: IMainProps) => (
  <>
    {props.meta}
    {props.children}
  </>
);

export { Main };
