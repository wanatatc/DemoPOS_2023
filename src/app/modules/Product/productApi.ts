import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../../Const";
import { ProductClient, ProductGroupRequestDto, ProductGroupResponseDtoServiceResponse } from "./productapi.client";

const queryClient = useQueryClient();

const productClient = new ProductClient(API_URL, axios);

const productGroupGetAllQueryKey = "ProductGroupGetAll";
const productGroupGetQueryKey = "ProductGroupGet";

// ProductGroupGetAll
export const useProductGroupGetAll = (
    page?: number | undefined,
    recordsPerPage?: number | undefined,
    column?: string | undefined,
    contain?: string | undefined,
    sortColumn?: string | undefined,
    ordering?: string | undefined
) => {
    return useQuery([productGroupGetAllQueryKey], () =>
        productClient.productGroupGetAll(page, recordsPerPage, column, contain, sortColumn, ordering)
    );
};

// ProductGroupGet
export const useProductGroupGet = (id: string) => {
    return useQuery([productGroupGetQueryKey, id], () => productClient.productGroupGet(id));
};

// ProductGroupCreate
export const useProductGroupCreate = (
    onSuccessCallback: (data: ProductGroupResponseDtoServiceResponse) => void,
    onErrorCallback: (error: string) => void
) => {
    return useMutation((body?: ProductGroupRequestDto) => productClient.productGroupCreate(body), {
        onSuccess: (response: ProductGroupResponseDtoServiceResponse) => {
            // Invalidate and refetch
            if (!response.isSuccess) onErrorCallback(response.message || response.exceptionMessage || "Unknown error");
            else onSuccessCallback(response);

            queryClient.invalidateQueries([productGroupGetAllQueryKey]);
        },
        onError: (error: Error) => {
            // Error logic
            onErrorCallback && onErrorCallback(error.message);

            queryClient.invalidateQueries([productGroupGetAllQueryKey]);
        },
    });
};

// ProductGroupUpdate
export const useProductGroupUpdate = (
    id: string,
    onSuccessCallback: (data: ProductGroupResponseDtoServiceResponse) => void,
    onErrorCallback: (error: string) => void
) => {
    return useMutation((body?: ProductGroupRequestDto) => productClient.productGroupUpdate(id, body), {
        onSuccess: (response: ProductGroupResponseDtoServiceResponse) => {
            // Invalidate and refetch
            if (!response.isSuccess) onErrorCallback(response.message || response.exceptionMessage || "Unknown error");
            else onSuccessCallback(response);

            queryClient.invalidateQueries([productGroupGetAllQueryKey]);
            queryClient.invalidateQueries([productGroupGetQueryKey, id]);
        },
        onError: (error: Error) => {
            // Error logic
            onErrorCallback && onErrorCallback(error.message);

            queryClient.invalidateQueries([productGroupGetAllQueryKey]);
            queryClient.invalidateQueries([productGroupGetQueryKey, id]);
        },
    });
};
