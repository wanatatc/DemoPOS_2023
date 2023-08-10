import { Paper, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { swalError, swalSuccess } from "../../_common";
import ProductGroupForm from "../components/ProductGroupForm";
import { useProductGroupGet, useProductGroupUpdate } from "../productApi";
import { ProductGroupRequestDto } from "../productapi.client";

const ProductGroupPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const onSuccessCallback = () => {
        swalSuccess("Success", "Product Group has been updated").then(() => {
            navigate("/product-group");
        });
    };

    const onErrorCallback = (error: string) => {
        swalError("Error", error).then(() => {
            formik.resetForm();
        });
    };

    const { data, isLoading, isError } = useProductGroupGet(id ?? "");
    const { mutate } = useProductGroupUpdate(id ?? "", onSuccessCallback, onErrorCallback);

    const formik = useFormik<ProductGroupRequestDto>({
        enableReinitialize: true,
        initialValues: {
            productGroupName: data?.data?.productGroupName ?? "",
        },
        onSubmit: (values) => {
            mutate(values);
        },
    });

    const { productGroupId, productGroupName } = data?.data ?? { productGroupId: "", productGroupName: "" };

    return (
        <Paper sx={{ p: 3 }} elevation={3}>
            <Typography variant="h4" gutterBottom>
                Edit {productGroupName == "" ? "Product Group" : productGroupName}
            </Typography>
            Product Group ID: {productGroupId}
            <ProductGroupForm formik={formik} />
        </Paper>
    );
};

export default ProductGroupPage;
