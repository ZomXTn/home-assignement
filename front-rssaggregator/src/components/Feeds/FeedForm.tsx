import { Button, Grid, TextField } from '@mui/material';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IFeed } from '../../types/entities';
import { FormModes } from '../../types/types';

interface IFeedFormProps {
    onSubmit: (values: IFeed) => void;
    initialValues?: IFeed;
    mode: FormModes
}

const FeedForm: React.FC<IFeedFormProps> = ({ onSubmit, initialValues, mode }) => {
    const formik = useFormik({
        initialValues: initialValues || {
            feed_id: "",
            image_url: "",
            name: "",
            url: "",
            last_updated: new Date().toISOString()
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            image_url: Yup.string().url('Invalid URL').required('Required'),
        }),
        onSubmit,
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField disabled={mode === FormModes.CONSULT}
                        fullWidth
                        id="name"
                        name="name"
                        label="Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField disabled={mode === FormModes.CONSULT}
                        fullWidth
                        id="image_url"
                        name="image_url"
                        label="Avatar URL"
                        value={formik.values.image_url}
                        onChange={formik.handleChange}
                        error={formik.touched.image_url && Boolean(formik.errors.image_url)}
                        helperText={formik.touched.image_url && formik.errors.image_url}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField disabled={mode === FormModes.CONSULT}
                        fullWidth
                        id="url"
                        name="url"
                        label="URL"
                        value={formik.values.url}
                        onChange={formik.handleChange}
                        error={formik.touched.url && Boolean(formik.errors.url)}
                        helperText={formik.touched.url && formik.errors.url}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button color="primary" variant="contained" fullWidth type="submit">
                        {mode === FormModes.CREATE && "Créer un flux rss"}
                        {mode === FormModes.EDIT && "Valider les modifications"}
                        {mode === FormModes.CONSULT && "Modifier un flux rss"}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default FeedForm;