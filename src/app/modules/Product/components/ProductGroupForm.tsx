import { Button, Grid, Icon } from "@mui/material";
import { FormikProps } from "formik";
import { FormikTextField } from "../../_common";

type ProductGroupFormProps = {
    formik?: FormikProps<any>;
};

const ProductGroupForm = ({ formik }: ProductGroupFormProps) => {
    if (!formik) return null;

    return (
        <form onSubmit={formik.handleSubmit}>
            <FormikTextField formik={formik} name="productGroupName" label="Name" />
            <Grid container justifyContent="flex-end" spacing={3} sx={{ mt: 1 }}>
                <Grid xs={12} md={2} item container justifyContent="flex-end">
                    <Button type="reset" variant="outlined" fullWidth startIcon={<Icon>clear</Icon>}>
                        Reset
                    </Button>
                </Grid>
                <Grid xs={12} md={2} item>
                    <Button type="submit" fullWidth startIcon={<Icon>save</Icon>}>
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default ProductGroupForm;
