import { Button } from "@mui/material";
import { MUIDataTableColumnDef, MUIDataTableMeta } from "mui-datatables";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../redux";
import { LoadingPlaceHolder, PaginationResultDto, PaginationSortableDto, StandardDataTable } from "../../_common";
import { useProductGroupGetAll } from "../productApi";
import { productSelector, setPagination } from "../productSlice";
import { ProductGroupResponseDto } from "../productapi.client";

export function ProductGroupDatatable() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleEdit = (id: string | undefined) => {
        navigate(`/product-group/${id}`);
    };

    const { productGroupPagination } = useAppSelector(productSelector);

    const handlePagination: React.Dispatch<React.SetStateAction<PaginationSortableDto>> = (newPaginate) => {
        if (typeof newPaginate == "function") {
            dispatch(setPagination(newPaginate(productGroupPagination)));
        } else {
            dispatch(setPagination(newPaginate));
        }
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
                color="primary"
                data={data?.data ?? []}
                columns={columns}
                paginated={pagination}
                setPaginated={handlePagination}
            />
        </LoadingPlaceHolder>
    );
}
