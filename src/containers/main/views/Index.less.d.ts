declare namespace IndexLessModule {
  export interface IIndexLess {
    main: string;
  }
}

declare const IndexLessModule: IndexLessModule.IIndexLess & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: IndexLessModule.IIndexLess;
};

export = IndexLessModule;
