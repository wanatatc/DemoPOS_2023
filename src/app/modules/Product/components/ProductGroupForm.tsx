import { Button } from "@mui/material";
import { FormikProps } from "formik";
import { FormikTextField } from "../../_common";

type ProductGroupFormProps = {
    formik: FormikProps<any>;
};

const ProductGroupForm = ({ formik }: ProductGroupFormProps) => {
    return (
        <form onSubmit={formik.handleSubmit}>
            <FormikTextField formik={formik} name="productGroupName" label="Name" />
            <Button type="submit">Submit</Button>
        </form>
    );
};

export default ProductGroupForm;
