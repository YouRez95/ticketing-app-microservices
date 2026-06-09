"use client";

import axios from "axios";
import { JSX, useCallback, useState } from "react";

interface UseRequestOptions {
  url: string;
  method: "get" | "post" | "put" | "delete";
  body?: Record<string, unknown>;
  onSuccess?: (data: unknown) => void;
}

interface UseRequestReturn {
  doRequest: () => Promise<unknown>;
  errors: JSX.Element | null;
}

export const useRequest = ({
  url,
  method,
  body,
  onSuccess,
}: UseRequestOptions): UseRequestReturn => {
  const [errors, setErrors] = useState<JSX.Element | null>(null);

  const doRequest = useCallback(async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);
      if (onSuccess) onSuccess(response.data);
      return response.data;
    } catch (err: unknown) {
      if (!axios.isAxiosError(err)) throw err;

      setErrors(
        <div
          className="bg-red-50 text-sm p-3 rounded-md flex items-start gap-3 border border-red-100"
          role="alert"
        >
          <div className="flex items-start gap-2.5 text-red-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4.5 fill-current overflow-visible shrink-0"
              viewBox="0 0 512 512"
              aria-hidden="true"
            >
              <path d="M256 0C114.508 0 0 114.497 0 256c0 141.493 114.497 256 256 256 141.492 0 256-114.497 256-256C512 114.507 397.503 0 256 0m0 472c-119.384 0-216-96.607-216-216 0-119.385 96.607-216 216-216 119.384 0 216 96.607 216 216 0 119.385-96.607 216-216 216" />
              <path d="M343.586 315.302 284.284 256l59.302-59.302c7.81-7.81 7.811-20.473.001-28.284-7.812-7.811-20.475-7.81-28.284 0L256 227.716l-59.303-59.302c-7.809-7.811-20.474-7.811-28.284 0s-7.81 20.474.001 28.284L227.716 256l-59.302 59.302c-7.811 7.811-7.812 20.474-.001 28.284 7.813 7.812 20.476 7.809 28.284 0L256 284.284l59.303 59.302c7.808 7.81 20.473 7.811 28.284 0s7.81-20.474-.001-28.284" />
            </svg>
            <div>
              <p className="font-medium leading-tight">
                {err.response?.data?.errors?.length
                  ? "Please fix the following errors:"
                  : "Something went wrong"}
              </p>
              <ul className="list-disc pl-4 mt-2 space-y-1">
                {err.response?.data?.errors?.map(
                  (e: { message: string }, i: number) => (
                    <li key={i}>{e.message}</li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </div>,
      );
    }
  }, [url, method, body, onSuccess]);

  return { doRequest, errors };
};
