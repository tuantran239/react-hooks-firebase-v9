import {
  QueryDocumentSnapshot,
  QueryConstraint,
  where,
  limit,
  orderBy,
  limitToLast,
  startAt,
  startAfter,
  endAt,
  endBefore,
  DocumentData,
  DocumentSnapshot,
} from "firebase/firestore";
import { ConstraintObject, SnapshotDocumentMap } from "../base";

export const convertToDocumentData = <T = any>(
  doc: DocumentSnapshot<DocumentData>
): SnapshotDocumentMap<T> => {
  const result: SnapshotDocumentMap<T> = {
    id: doc.id,
    data: doc.data() as T,
    ref: doc.ref,
    exists: doc.exists(),
    get: doc.get,
  };
  return result;
};

export const mapToDocumentData = <T = any>(
  docs: QueryDocumentSnapshot<DocumentData>[]
): Array<SnapshotDocumentMap<T>> => {
  const arr: Array<SnapshotDocumentMap<T>> = [];
  if (docs.length > 0) {
    docs.forEach((doc) => {
      const result: SnapshotDocumentMap<T> = {
        id: doc.id,
        data: doc.data() as T,
        ref: doc.ref,
        exists: doc.exists(),
        get: doc.get,
      };
      arr.push(result);
    });
  }
  return arr;
};

export const mapToQueryConstraintArray = (
  constraintObject: ConstraintObject
) => {
  const constraints: QueryConstraint[] = [];
  if (constraintObject.where) {
    constraintObject.where.forEach((wh) => {
      constraints.push(where(wh[0], wh[1], wh[2]));
    });
  }
  if (constraintObject.limit) {
    constraints.push(limit(constraintObject.limit));
  }
  if (constraintObject.orderBy) {
    constraintObject.orderBy.forEach((ob) => {
      constraints.push(orderBy(ob[0], ob[1]));
    });
  }
  if (constraintObject.limitToLast) {
    constraints.push(limitToLast(constraintObject.limitToLast));
  }
  if (constraintObject.startAt) {
    constraints.push(startAt(constraintObject.startAt));
  }
  if (constraintObject.startAfter) {
    constraints.push(startAfter(constraintObject.startAfter));
  }
  if (constraintObject.endAt) {
    constraints.push(endAt(constraintObject.endAt));
  }
  if (constraintObject.endBefore) {
    constraints.push(endBefore(constraintObject.endBefore));
  }
  return constraints;
};
