// eslint-disable-next-line
type GenericFunction = (...args: any[]) => unknown;

const asyncFunctionConcat = (
  func1: GenericFunction,
  func2: GenericFunction,
): GenericFunction => {
  return async () => {
    await func1();
    await func2();
  };
};

const multipleAsyncFunctionConcat = (
  ...funcs: GenericFunction[]
): GenericFunction => {
  return funcs.reduce((prev, curr) => asyncFunctionConcat(prev, curr));
};

export { asyncFunctionConcat, multipleAsyncFunctionConcat };
