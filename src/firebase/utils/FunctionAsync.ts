export interface Return<T> {
  data: T;
  error: any;
}

export async function FunctionAsyncReturnError<K>(
  onHandle: () => Promise<K>
): Promise<Partial<Return<K>>> {
  try {
    const res = await onHandle();
    return { data: res };
  } catch (error: any) {
    return { error };
  }
}

export async function FunctionAsyncThrowError<K>(
  onHandle: () => Promise<K>
): Promise<K> {
  try {
    const res = await onHandle();
    return res;
  } catch (error: any) {
    throw error;
  }
}
