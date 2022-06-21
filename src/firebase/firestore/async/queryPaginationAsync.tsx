import { getDocs, query, CollectionReference } from "firebase/firestore";
import { Pagination } from "../../base";
import { mapToQueryConstraintArray } from "../../utils/map";
import { FunctionAsyncReturnError } from "../../utils/FunctionAsync";
import { getNumberOfPage } from "../../utils/getNumberOfPage";

const QueryPaginationAsync = (
  collection: CollectionReference,
  pagination: Pagination
) =>
  FunctionAsyncReturnError(async () => {
    const queryAll = query(
      collection,
      ...mapToQueryConstraintArray({
        orderBy: pagination.orderBy,
      })
    );
    const queryDocs = await getDocs(queryAll);
    let start = 0;
    const allDocs = queryDocs.docs;
    // if (allDocs.length < pagination.limit) {
    //   throw new Error("number of docs must be greater than or equal to pagination limit");
    // }
    const numberOfPage = getNumberOfPage(allDocs.length, pagination.limit);
    if (pagination.page > numberOfPage) {
      pagination.page = numberOfPage;
    }
    if (pagination.page > 0) {
      start = pagination.limit * pagination.page - pagination.limit;
    }
    const lastVisible = allDocs[start === 0 ? 0 : start - 1];
    const q = query(
      collection,
      ...mapToQueryConstraintArray({
        orderBy: pagination.orderBy,
        startAt: start === 0 ? lastVisible : undefined,
        startAfter: start !== 0 ? lastVisible : undefined,
        limit: pagination.limit,
        where: pagination.where
      })
    );
    const snapshot = await getDocs(q);
    return snapshot;
  });

export default QueryPaginationAsync;
