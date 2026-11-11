import { blocksClient } from "../../lib/blocks/client";

export type Task = {
  ItemId?: string;
  title?: string;
  dueDate?: string;
  done?: boolean;
  CreatedBy?: string;
  CreatedDate?: string;
};

const tasks = blocksClient.data.collection<Task>("Task", {
  fields: ["title", "dueDate", "done", "CreatedBy", "CreatedDate"]
});

type GatewayError = { message?: string; Message?: string; errorMessage?: string };

/** Strip the reason the gateway gives even when the HTTP answer was a 200. */
export function gatewayError(response: unknown): string | undefined {
  if (!response || typeof response !== "object") return undefined;
  const record = response as { errors?: unknown; error?: unknown; message?: unknown };
  const errors = record.errors;
  if (Array.isArray(errors) && errors.length > 0) {
    const first = errors[0] as GatewayError | string;
    if (typeof first === "string") return first;
    return first.message || first.Message || first.errorMessage || "The request was refused.";
  }
  if (errors && typeof errors === "object") {
    const first = errors as GatewayError;
    return first.message || first.Message || first.errorMessage || "The request was refused.";
  }
  if (typeof record.error === "string") return record.error;
  if (typeof record.message === "string" && /error|denied|forbidden|refused/i.test(record.message)) return record.message;
  return undefined;
}

type ItemsPage<T> = { items: T[]; totalCount: number };

export function itemsOf<T>(response: unknown, queryName: string): ItemsPage<T> {
  const record = response as {
    data?: Record<string, { items?: T[]; totalCount?: number } | undefined>;
  };
  const page = record.data?.[queryName];
  return { items: page?.items ?? [], totalCount: page?.totalCount ?? page?.items?.length ?? 0 };
}

export async function listTasks(): Promise<Task[]> {
  const response = await tasks.list({ pageNo: 1, pageSize: 200, sort: { CreatedDate: 1 } });
  const failure = gatewayError(response);
  if (failure) throw new Error(failure);
  return itemsOf<Task>(response, "getTasks").items;
}

export async function createTask(input: { title: string; dueDate: string; done: boolean }): Promise<string> {
  const response = (await tasks.create(input)) as {
    data?: { insertTask?: { acknowledged?: boolean; itemId?: string; message?: string } | null };
  };
  const failure = gatewayError(response);
  const result = response.data?.insertTask;
  if (failure) throw new Error(failure);
  if (!result?.acknowledged) throw new Error(result?.message || "The task could not be saved.");
  return String(result.itemId);
}

export async function setTaskDone(itemId: string, done: boolean): Promise<void> {
  const response = (await tasks.update(itemId, { done })) as {
    data?: { updateTask?: { acknowledged?: boolean; message?: string } | null };
  };
  const failure = gatewayError(response);
  const result = response.data?.updateTask;
  if (failure) throw new Error(failure);
  if (!result?.acknowledged) throw new Error(result?.message || "The task could not be saved.");
}

export async function updateTaskFields(itemId: string, input: { title: string; dueDate: string }): Promise<void> {
  const response = (await tasks.update(itemId, input)) as {
    data?: { updateTask?: { acknowledged?: boolean; message?: string } | null };
  };
  const failure = gatewayError(response);
  const result = response.data?.updateTask;
  if (failure) throw new Error(failure);
  if (!result?.acknowledged) throw new Error(result?.message || "The task could not be saved.");
}

export async function deleteTask(itemId: string): Promise<void> {
  const response = (await tasks.delete(itemId, { hardDelete: true })) as {
    data?: { deleteTask?: { acknowledged?: boolean; message?: string } | null };
  };
  const failure = gatewayError(response);
  const result = response.data?.deleteTask;
  if (failure) throw new Error(failure);
  if (!result?.acknowledged) throw new Error(result?.message || "The task could not be removed.");
}
