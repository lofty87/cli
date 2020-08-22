import { LinkProps, NavLinkProps, RouteComponentProps } from 'react-router-dom';

/**
 * * 자주 사용되는 prop 타입을 공통으로 정의
 */

// ? styled-components
export type SCP = {
  className?: string;
};

// ? Route render
export type RRP<Params = {}> = RouteComponentProps<Params>;

// ? NavLink
export type NLP = Omit<NavLinkProps, keyof LinkProps>;

// ? Tab Panel
export type TPP = {
  hidden?: boolean;
};

// ? Form Mode
export type FMP = {
  mode: 'add' | 'update';
};
