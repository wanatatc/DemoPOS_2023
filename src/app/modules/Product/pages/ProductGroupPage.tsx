import { Paper, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { swalError, swalSuccess } from "../../_common";
import ProductGroupForm from "../components/ProductGroupForm";

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
            // formik.resetForm();
        });
    };

    // use query

    // use mutation

    // create formik

    const { productGroupId, productGroupName } = { productGroupId: "", productGroupName: "" };

    return (
        <Paper sx={{ p: 3 }} elevation={3}>
            <Typography variant="h4" gutterBottom>
                Edit {productGroupName == "" ? "Product Group" : productGroupName}
            </Typography>
            Product Group ID: {productGroupId}
            <ProductGroupForm />
        </Paper>
    );
};

export default ProductGroupPage;
