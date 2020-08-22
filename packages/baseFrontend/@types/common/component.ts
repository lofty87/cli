import { FunctionComponent, ReactElement, ReactNode } from 'react';

/**
 * * children prop 의 유, 무를 명확하게 정의하고 싶어 작성
 */

type ComponentBase<Props = {}> = Pick<FunctionComponent<Props>, 'contextTypes' | 'defaultProps' | 'displayName' | 'propTypes'>;

type ChildrenProp = {
  children: ReactNode;
};

interface NoneChildrenFunctionComponent<P = {}> extends ComponentBase {
  (props: P, context?: any): ReactElement | null;
}

interface ChildrenFunctionComponent<P = {}> extends ComponentBase {
  (props: P & ChildrenProp, context?: any): ReactElement | null;
}

export type NCFC<P = {}> = NoneChildrenFunctionComponent<P>;

export type CFC<P = {}> = ChildrenFunctionComponent<P>;
