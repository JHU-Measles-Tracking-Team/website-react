type GraphQLResult = { __typename?: string };
type ValueOfTypename<T extends GraphQLResult> = T["__typename"];

export function isGraphqlType<
  Result extends GraphQLResult,
  Typename extends ValueOfTypename<Result>,
>(
  result: Result,
  typename: Typename,
): result is Extract<Result, { __typename: Typename }> {
  return result?.__typename === typename;
}
