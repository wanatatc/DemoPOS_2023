import { Button, Dialog, Divider, Grid, Icon, Paper, Typography } from "@mui/material";
import { FormikErrors, useFormik } from "formik";
import { MUIDataTableColumnDef, MUIDataTableMeta } from "mui-datatables";
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
import ProductGroupForm from "../components/ProductGroupForm";
import { useProductGroupCreate, useProductGroupGetAll } from "../productApi";
import { productSelector, setPagination, setProductGroupCreatePopup } from "../productSlice";
import { ProductGroupRequestDto, ProductGroupResponseDto } from "../productapi.client";

function ProductGroupDatatable() {
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

const IndexPage = () => {
    const dispatch = useAppDispatch();

    const handlePopup = (open: boolean) => {
        formik.resetForm();
        dispatch(setProductGroupCreatePopup(open));
    };

    const { productGroupCreatePopup } = useAppSelector(productSelector);

    const onSuccessCallback = () => {
        handlePopup(false);
        swalSuccess("Success", "Create Product Group Success");
    };

    const onErrorCallback = (error: string) => {
        swalError("Error", error);
    };

    const { mutate } = useProductGroupCreate(onSuccessCallback, onErrorCallback);

    const formik = useFormik<ProductGroupRequestDto>({
        initialValues: {
            productGroupName: "",
        },
        onSubmit: (values) => {
            mutate(values);
        },
        validate: (values) => {
            const errors: FormikErrors<ProductGroupRequestDto> = {};

            if (!values.productGroupName) {
                errors.productGroupName = "Required";
            }

            return errors;
        },
    });

    return (
        <Paper sx={{ p: 3 }} elevation={3}>
            <Grid container>
                <Grid xs={8} item>
                    <Typography variant="h4">Product Group</Typography>
                </Grid>
                <Grid xs={4} item container justifyContent="flex-end">
                    <Button onClick={() => handlePopup(true)} startIcon={<Icon>add_circle</Icon>}>
                        Create
                    </Button>
                </Grid>
            </Grid>
            <Divider sx={{ mt: 1, mb: 3 }} />
            <ProductGroupDatatable />

            <Dialog open={productGroupCreatePopup} onClose={() => handlePopup(false)} fullWidth maxWidth={"md"}>
                <Paper sx={{ p: 3 }} elevation={3}>
                    <Typography variant="h5" gutterBottom>
                        Create Product Group
                    </Typography>
                    <ProductGroupForm formik={formik} />
                </Paper>
            </Dialog>
        </Paper>
    );
};

export default IndexPage;
