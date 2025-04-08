export {};

// import { useState, useEffect } from "react";
// import {
//   TActiveFilters,
//   TFilterOption,
//   TStrapiSort,
// } from "types/api/strapi-filtering";
// import { fetchCollectionType } from "util/api";
// import { DocumentNode, TypedDocumentNode } from "@apollo/client";
// import { apolloClientClient as apolloClient } from "apollo-client";

// export type TonPageChange = (page: number) => void;

// export enum FetchStatus {
//   INITIAL = "initial",
//   LOADING = "loading",
//   ERROR = "error",
//   COMPLETE = "complete",
// }

// export interface WithCollectionFetch {
//   onLoadMore: () => void;
//   onPageChange: TonPageChange;
//   itemTotal: number;
//   currentPage: number;
//   onFiltersChange: TonFiltersChange;
//   status: FetchStatus;
// }

// export type TonFiltersChange = (filters: TActiveFilters) => void;

// export interface IuseCollectionFetchArgs {
//   apiType: "rest" | "graphql";
//   collectionName: string;
//   graphqlQuery?: DocumentNode | TypedDocumentNode<any, any>;
//   baseLoad?: number;
//   perLoadMore?: number;
//   defaultFilters?: TActiveFilters;
//   sort?: TStrapiSort;
//   locale?: string;
// }

// export default function useCollectionFetch<CollectionType>({
//   apiType,
//   collectionName,
//   graphqlQuery,
//   baseLoad = 6,
//   perLoadMore = 6,
//   defaultFilters = {},
//   sort = null,
//   locale,
// }: IuseCollectionFetchArgs):
//   | {
//       collectionItems: CollectionType[];
//     } & WithCollectionFetch {
//   if (apiType === "graphql" && !graphqlQuery) {
//     throw new Error("GraphQL requests require the `graphqlQuery` field.");
//   }

//   type apolloReturnData = {
//     [key: string]: CollectionType[];
//   };

//   const [status, setStatus] = useState<FetchStatus>(FetchStatus.INITIAL);
//   const [itemCount, setItemCount] = useState(baseLoad);
//   const [itemPage, setItemPage] = useState(0);
//   const [items, setItems] = useState<CollectionType[]>([]);
//   const [itemTotal, setItemTotal] = useState(0);
//   const [filters, setFilters] = useState<TActiveFilters>(defaultFilters);
//   const [filtersChanged, setFiltersChanged] = useState<number>(0);

//   const sortFilter =
//     sort?.field && sort?.direction ? `${sort.field}:${sort.direction}` : ``;

//   const onLoadMore = () => {
//     setItemCount(itemCount + perLoadMore);
//   };

//   const onPageChange: TonPageChange = (_page) => {
//     const page = _page - 1;
//     if (page !== itemPage) {
//       setItemPage(page);
//     }
//   };

//   const onFiltersChange: TonFiltersChange = (newFilters: TActiveFilters) => {
//     setItemPage(0);
//     setItemCount(baseLoad);
//     setFilters({ ...filters, ...newFilters });
//     setFiltersChanged(filtersChanged === 0 ? 1 : 0);
//   };

//   const strapiWhereClauses = remapFilterClauses(filters, apiType);

//   // Fetch limited articles (for pagination) to get item data
//   useEffect(() => {
//     let mounted = true;

//     // wrappedEffect simple a async wrapper so the Promise all can with await'd
//     const wrappedEffect = async () => {
//       const fetchItems = async (): Promise<CollectionType[]> => {
//         if (apiType === "rest") {
//           const items: CollectionType[] = await fetchCollectionType(
//             collectionName,
//             {
//               _where: {
//                 _or: strapiWhereClauses,
//               },
//               _start: itemPage > 0 ? itemPage * itemCount : 0,
//               _limit: itemCount,
//               _sort: sortFilter,
//               _locale: locale,
//             },
//           );
//           return items;
//         } else if (apiType === "graphql") {
//           const items = await apolloClient.query<apolloReturnData>({
//             query: graphqlQuery,
//             variables: {
//               where: {
//                 _or: strapiWhereClauses,
//               },
//               start: itemPage > 0 ? itemPage * itemCount : 0,
//               limit: itemCount,
//               sort: sortFilter,
//               locale: locale,
//             },
//           });
//           return items.data[collectionName];
//         }
//       };

//       const fetchItemTotal = async () => {
//         if (apiType === "rest") {
//           const items = await fetchCollectionType(collectionName, {
//             _where: {
//               _or: strapiWhereClauses,
//             },
//             _limit: -1,
//             _sort: sortFilter,
//             _locale: locale,
//           });
//           return items.length;
//         } else if (apiType === "graphql") {
//           const items = await apolloClient.query<apolloReturnData>({
//             query: graphqlQuery,
//             variables: {
//               where: {
//                 _or: strapiWhereClauses,
//               },
//               limit: -1,
//               start: 0,
//               sort: sortFilter,
//               locale: locale,
//             },
//           });
//           return items.data[collectionName].length;
//         }
//       };
//       try {
//         setStatus(FetchStatus.LOADING);
//         const items = await fetchItems();
//         const itemTotal = await fetchItemTotal();

//         if (!mounted) return;

//         setItems(items);
//         setItemTotal(itemTotal);
//         setStatus(FetchStatus.COMPLETE);
//       } catch (error) {
//         setStatus(FetchStatus.ERROR);
//       }
//     };

//     wrappedEffect();
//     // set the mounted flag to false, ugly, but it does the job
//     return () => {
//       mounted = false;
//     };
//   }, [itemCount, itemPage, filtersChanged, locale]);

//   return {
//     collectionItems: items,
//     onLoadMore,
//     onPageChange,
//     itemTotal,
//     onFiltersChange,
//     currentPage: itemPage + 1,
//     status,
//   };
// }

// const remapFilterClauses = (
//   filters: TActiveFilters,
//   apiType: IuseCollectionFetchArgs["apiType"],
// ) => {
//   const remappedFilterClauses = [];
//   let strapiWhereClauses = [];
//   let i = 0;

//   if (Object.entries(filters).length) {
//     const filterKeys = Object.entries(filters).map(([name, filter]) => name);

//     for (const a of filters[filterKeys[0]].options) {
//       if (filters[filterKeys[1]]) {
//         for (const b of filters[filterKeys[1]].options) {
//           if (filters[filterKeys[2]]) {
//             for (const c of filters[filterKeys[2]].options) {
//               remappedFilterClauses[i] = [a, b, c];
//               i++;
//             }
//           } else {
//             remappedFilterClauses[i] = [a, b];
//             i++;
//           }
//         }
//       } else {
//         remappedFilterClauses[i] = [a];
//         i++;
//       }
//     }

//     // TODO: Doublecheck logic for multiple multiselect filter support for graphql.
//     // TODO: The current GraphQL implementation may not support multiple filters.
//     strapiWhereClauses = remappedFilterClauses.map((filterClause) => {
//       if (apiType === "rest") {
//         return filterClause.map((selectedOption: TFilterOption) => {
//           const {
//             value,
//             data: { strapiField, strapiComparator },
//           } = selectedOption;
//           return { [`${strapiField}_${strapiComparator}`]: value };
//         });
//       } else if (apiType === "graphql") {
//         const {
//           value,
//           data: { strapiField, strapiComparator },
//         } = filterClause[0];
//         return { [`${strapiField}_${strapiComparator}`]: value };
//       }
//     });
//   }

//   return strapiWhereClauses;
// };
