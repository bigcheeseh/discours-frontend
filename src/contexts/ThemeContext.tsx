import cn from "classnames";
import React from "react";
import { defaultThemeName, ThemeName } from "src/config/theme";

export interface WithLocale {
  activeTheme: ThemeName;
  setActiveTheme(theme: ThemeName): void;
}

const { Provider, Consumer } = React.createContext<WithLocale>({
  activeTheme: defaultThemeName,
  setActiveTheme: (theme: ThemeName) => {},
});

export class ThemeContextProvider extends React.PureComponent<{}, WithLocale> {
  constructor(props: {}) {
    super(props);
    this.state = {
      activeTheme: defaultThemeName,
      setActiveTheme: this.setActiveTheme,
    };
  }

  public render() {
    const { state, props } = this;
    return (
      <Provider value={state}>
        <div className={cn(`discours-theme-${state.activeTheme}`)}>
          {props.children}
        </div>
      </Provider>
    );
  }

  private setActiveTheme = (theme: ThemeName) => {
    this.setState({
      activeTheme: theme,
    });
  };
}

export const withLocale = <
  P extends WithLocale,
  R = Pick<P, Exclude<keyof P, keyof WithLocale>>
>(
  Component: React.ComponentType<P>,
): React.SFC<R> => {
  return (props: R) => {
    return (
      // tslint:disable-next-line no-any
      <Consumer>{(ctx) => <Component {...ctx} {...(props as any)} />}</Consumer>
    );
  };
};
