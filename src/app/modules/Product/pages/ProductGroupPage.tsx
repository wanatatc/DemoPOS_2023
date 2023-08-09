import { Paper, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { swalError, swalSuccess } from "../../_common";
import ProductGroupForm from "../components/ProductGroupForm";
import { useProductGroupGet, useProductGroupUpdate } from "../productApi";

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

    const { productGroupName, productGroupId } = data?.data ?? {};

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: productGroupName,
        },
        onSubmit: (values) => {
            console.log(values);
        },
    });

    return (
        <Paper>
            <Typography variant="h4">{productGroupId}</Typography>
            <ProductGroupForm formik={formik} />
        </Paper>
    );
};

export default ProductGroupPage;
