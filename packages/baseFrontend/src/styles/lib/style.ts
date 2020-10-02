import { includes, isEmpty, isPlainObject } from 'lodash';
import { Duration, Easing } from '@material-ui/core';
import { SpacingArgument } from '@material-ui/core/styles/createSpacing';
import { ZIndex } from '@material-ui/core/styles/zIndex';
import { Shadows } from '@material-ui/core/styles/shadows';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { scTheme } from '@constants/theme';

type Theme = typeof scTheme;

type Props = { theme: Theme };

/**
 * @name Of Functions
 * * style 안에서 styled-components theme 을 편하게 사용하기 위해
 */

type OfFn<T> = (param: T) => string | number;

export const colorOf = (fn: OfFn<Theme['colors']>) => {
  return (props: Props) => fn(props.theme.colors);
};

export const fontOf = (fn: OfFn<Theme['font']>) => {
  return (props: Props) => fn(props.theme.font);
};

// ! overloading type
export const spacingOf = (...values: SpacingArgument[]) => {
  return (props: Props) =>
    props.theme.spacing(
      ...(values as [SpacingArgument, SpacingArgument, SpacingArgument, SpacingArgument])
    );
};

export const zIndexOf = (key: keyof ZIndex) => {
  return (props: Props) => props.theme.zIndex[key];
};

export const shadowOf = (key: keyof Shadows) => {
  return (props: Props) => props.theme.shadows[key];
};

export const easingOf = (key: keyof Easing) => {
  return (props: Props) => props.theme.transitions.easing[key];
};

export const durationOf = (key: keyof Duration) => {
  return (props: Props) => props.theme.transitions.duration[key];
};

/**
 * @name breakpoints
 * * style 안에서 material-ui breakpoints 를 편하게 사용하기 위해
 */

type BreakpointKeys = Breakpoint | number;

export const breakpoints = {
  keys: (props: Props) => props.theme.breakpoints.keys,
  values: (props: Props) => props.theme.breakpoints.values,
  width: (key: Breakpoint) => (props: Props) => props.theme.breakpoints.width(key),
  only: (key: Breakpoint) => (props: Props) => props.theme.breakpoints.only(key),
  up: (key: BreakpointKeys) => (props: Props) => props.theme.breakpoints.up(key),
  down: (key: BreakpointKeys) => (props: Props) => props.theme.breakpoints.down(key),
  between: (start: BreakpointKeys, end: BreakpointKeys) => (props: Props) =>
    props.theme.breakpoints.between(start, end),
};

/**
 * @name mappedBy
 * * prop 값에 매핑된 style 을 설정하여 유연한 style 작성을 위해
 */
export const mappedBy = <S extends object>(styleMap: S, by?: keyof S) => {
  if(!by) {
    return '';
  }

  if(!styleMap[by]) {
    console.warn(`no mapped style by ${by}`);

    return '';
  }

  return styleMap[by] as any;
};

/**
 * @name selectedBy
 * * advanced mappedBy
 *
 * * prop 값에 매핑된 style 설정 뿐만 아니라
 * * prop 값에 따라 부분적인 매핑된 style 또는 단일 style 설정도 가능하다.
 *
 * * 1. prop 값이 있으면 매핑된 style 또는 단일 style 을 리턴
 * * 2. prop 값이 있더라도 부분적인 매핑된 style 또는 단일 style 을 리턴
 * * 3. prop 값이 없더라도 'default' 가 설정되어 있으면 단일 style 을 리턴
 */
export const selectedBy = <Key extends any>(
  style: object,
  by?: Key,
  partial: (Key | 'default')[] = []
) => {
  if(!by) {
    if(includes(partial, 'default')) {
      return isPlainObject(style) ? '' : style;
    }

    return '';
  }

  if(!isEmpty(partial)) {
    if(includes(partial, by)) {
      return isPlainObject(style) ? mappedBy(style, by as any) : style;
    }

    return '';
  }

  return isPlainObject(style) ? mappedBy(style, by as any) : style;
};
