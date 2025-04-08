// Configuration to inform what filters to display
export type TFilterData = {
  strapiField: string;
  strapiComparator: TStrapiFilterComparators;
};

export type TFilterOption = {
  label: string;
  value: string;
  data?: TFilterData;
};

export type TStrapiFetchFilters = {
  [key: string]: {
    title: string;
    type: "singleSelect" | "multiSelect";
    operator?: "or" | "and"; // only used or multiSelect, defaults to "or"
    options: Array<TFilterOption>;
  };
};

export type TStrapiSort = {
  field: string;
  direction: "asc" | "desc";
} | null;

// The current active filter state
export interface TActiveFilters {
  [key: string]: {
    operator?: "or" | "and"; // only used or multiSelect, defaults to "or"
    type: "singleSelect" | "multiSelect";
    options: Array<TFilterOption>; // single element for singleSelect, multiple elements for multiSelect
  };
}

export type TStrapiFilterComparators =
  | "eq"
  | "ne"
  | "lt"
  | "gt"
  | "lte"
  | "gte"
  | "in"
  | "nin"
  | "contains"
  | "ncontains"
  | "containss"
  | "ncontainss"
  | "null";
