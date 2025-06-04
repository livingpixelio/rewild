export interface Pagination {
  page: number;
  totalPages: number | null;
  params: {
    limit: number;
    skip: number;
  };
  url: {
    first: string | null;
    prev: string | null;
    next: string | null;
    last: string | null;
  };
  summary: {
    from: number;
    to: number;
    of: number | null;
  };
}
