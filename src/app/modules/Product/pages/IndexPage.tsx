import { Button, Dialog, Divider, Grid, Paper, Typography } from "@mui/material";
import { MUIDataTableColumnDef, MUIDataTableMeta } from "mui-datatables";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../redux";
import {
    LoadingPlaceHolder,
    PaginationResultDto,
    PaginationSortableDto,
    StandardDataTable,
    swalError,
    swalSuccess,
} from "../../_common";
import { useProductGroupCreate, useProductGroupGetAll } from "../productApi";
import { productSelector, setPagination, setProductGroupCreatePopup } from "../productSlice";
import ProductGroupForm from "../components/ProductGroupForm";
import { useFormik } from "formik";
import { ProductGroupResponseDto } from "../productapi.client";

const IndexPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { productGroupCreatePopup, productGroupPagination } = useAppSelector(productSelector);

    const handleEdit = (id: string | undefined) => {
        navigate(`/product-group/${id}`);
    };

    const handlePopup = (open: boolean) => {
        formik.resetForm();
        dispatch(setProductGroupCreatePopup(open));
    };

    const handlePagination: React.Dispatch<React.SetStateAction<PaginationSortableDto>> = (newPaginate) => {
        if (typeof newPaginate == "function") {
            dispatch(setPagination(newPaginate(productGroupPagination)));
        } else {
            dispatch(setPagination(newPaginate));
        }
    };

    const onSuccessCallback = () => {
        handlePopup(false);
        swalSuccess("Success", "Create Product Group Success");
    };

    const onErrorCallback = (error: string) => {
        swalError("Error", error);
    };

    const { data, isLoading, isError } = useProductGroupGetAll(
        productGroupPagination.page,
        productGroupPagination.recordsPerPage
    );

    const { mutate } = useProductGroupCreate(onSuccessCallback, onErrorCallback);

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

    const formik = useFormik({
        initialValues: {
            productGroupName: "",
        },
        onSubmit: (values) => {
            mutate(values);
        },
    });

    return (
        <Paper sx={{ p: 3 }} elevation={3}>
            <Grid container>
                <Grid xs={8} item>
                    <Typography variant="h4">Product Group</Typography>
                </Grid>
                <Grid xs={4} item container justifyContent="flex-end">
                    <Button onClick={() => handlePopup(true)}>Create</Button>
                </Grid>
            </Grid>
            <Divider sx={{ mt: 1, mb: 3 }} />
            <LoadingPlaceHolder isLoading={isLoading} isError={isError}>
                <StandardDataTable
                    name="Product Group"
                    data={data?.data ?? []}
                    columns={columns}
                    paginated={pagination}
                    setPaginated={handlePagination}
                />
            </LoadingPlaceHolder>

            <Dialog open={productGroupCreatePopup} onClose={() => handlePopup(false)} sx={{ p: 3 }}>
                <Typography variant="h4">Create Product Group</Typography>
                <ProductGroupForm formik={formik} />
            </Dialog>
        </Paper>
    );
};

export default IndexPage;
