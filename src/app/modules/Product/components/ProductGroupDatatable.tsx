import { Button } from "@mui/material";
import { MUIDataTableColumnDef } from "mui-datatables";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../redux";
import { PaginationResultDto, PaginationSortableDto, StandardDataTable } from "../../_common";
import { productSelector, setPagination } from "../productSlice";

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

    const pagination: PaginationResultDto = {};

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
                customBodyRender(_value) {
                    const id = "0"; // data?.data ? data.data[tableMeta.rowIndex].productGroupId :;

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
        <StandardDataTable
            name="Product Group"
            color="primary"
            data={[]}
            columns={columns}
            paginated={pagination}
            setPaginated={handlePagination}
        />
    );
}
