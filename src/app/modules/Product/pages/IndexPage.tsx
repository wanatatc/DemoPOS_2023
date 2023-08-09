import { Button } from "@mui/material";
import { MUIDataTableColumnDef, MUIDataTableMeta } from "mui-datatables";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../redux";
import { LoadingPlaceHolder, PaginationResultDto, PaginationSortableDto, StandardDataTable } from "../../_common";
import { useProductGroupGetAll } from "../productApi";
import { ProductGroupResponseDto } from "../productApi.client";
import { productSelector, setPagination, setProductGroupCreatePopup } from "../productSlice";

const IndexPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { productGroupCreatePopup, productGroupPagination } = useAppSelector(productSelector);

    const [first, setfirst] = useState<string>("second");

    const handleEdit = (id: string | undefined) => {
        navigate(`/product-group/${id}`);
    };

    const handlePopup = (open: boolean) => {
        dispatch(setProductGroupCreatePopup(open));
    };

    const handlePagination: React.Dispatch<React.SetStateAction<PaginationSortableDto>> = (newPagination) => {
        dispatch(setPagination(newPagination as PaginationSortableDto));
    };

    const { data, isLoading, isError } = useProductGroupGetAll(
        productGroupPagination.page,
        productGroupPagination.recordsPerPage
    );

    const pagination: PaginationResultDto = {
        currentPage: data?.currentPage ?? 1,
        pageIndex: data?.pageIndex ?? 0,
        recordsPerPage: data?.recordsPerPage ?? 5,
        totalAmountPages: data?.totalAmountPages ?? 0,
        totalAmountRecords: data?.totalAmountRecords ?? 0,
    };

    const columns: MUIDataTableColumnDef[] = [
        {
            name: "productGroupId",
            label: "Id",
        },
        {
            name: "productGroupName",
            label: "Name",
        },
        {
            name: "toolbar",
            label: "Action",
            options: {
                customBodyRender(_value, tableMeta: MUIDataTableMeta<ProductGroupResponseDto>) {
                    const id = data?.data ? data.data[tableMeta.rowIndex].productGroupId : "0";

                    return (
                        <>
                            <Button onClick={() => handleEdit(id)}>Edit</Button>
                        </>
                    );
                },
            },
        },
    ];

    return (
        <LoadingPlaceHolder isLoading={isLoading} isError={isError}>
            <StandardDataTable
                name="Product Group"
                data={data?.data ?? []}
                columns={columns}
                displayFooter={false}
                paginated={pagination}
                setPaginated={handlePagination}
            />
        </LoadingPlaceHolder>
    );
};

export default IndexPage;
