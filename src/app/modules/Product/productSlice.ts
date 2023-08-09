import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaginationSortableDto } from "../_common";

export type ProductState = {
    productGroupCreatePopup: boolean;
    productGroupPagination: PaginationSortableDto;
};

const initialState: ProductState = {
    productGroupCreatePopup: false,
    productGroupPagination: {
        page: 1,
        recordsPerPage: 10,
    },
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProductGroupCreatePopup: (state, action: PayloadAction<boolean>) => {
            state.productGroupCreatePopup = action.payload;
        },
        setPagination: (state, action: PayloadAction<PaginationSortableDto>) => {
            state.productGroupPagination = {
                ...state.productGroupPagination,
                ...action.payload,
            };
        },
    },
});

export const { setProductGroupCreatePopup, setPagination } = productSlice.actions;

export const productSelector = (state: { product: ProductState }) => state.product;

export default productSlice.reducer;
