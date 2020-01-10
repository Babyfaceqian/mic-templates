declare namespace MainLessModule {
  export interface IMainLess {
    main: string;
  }
}

declare const MainLessModule: MainLessModule.IMainLess & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: MainLessModule.IMainLess;
};

export = MainLessModule;
