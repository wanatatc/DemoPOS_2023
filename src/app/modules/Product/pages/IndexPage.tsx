import { Button, Dialog, Divider, Grid, Icon, Paper, Typography } from "@mui/material";
import { FormikErrors, useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../../redux";
import { swalError, swalSuccess } from "../../_common";
import { ProductGroupDatatable } from "../components/ProductGroupDatatable";
import ProductGroupForm from "../components/ProductGroupForm";
import { useProductGroupCreate } from "../productApi";
import { productSelector, setProductGroupCreatePopup } from "../productSlice";
import { ProductGroupRequestDto } from "../productapi.client";

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
