import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { RootState } from '../../../../store';
import { useAuth } from '@/hooks/useAuth';
import Divider from '@mui/material/Divider';
import Swal from 'sweetalert2';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../../../../components/Copyright/Copyright';
import { Field, FieldArray, useFormik, validateYupSchema, FormikProvider, setNestedObjectValues } from 'formik';
import * as yup from 'yup';
// import { useNavigate } from 'react-router-dom';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
// import { createAsyncThunk } from '@reduxjs/toolkit';
import { getSizes } from '@/features/sizes/sizesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCategoriesQuery, useGetProductQuery, useGetProductsQuery } from '@/features';
import DeleteProduct from './DeleteProduct'
import UpdateStock from './StockUpdate';
import { Endpoint } from '@/routes/routes';
import { array } from 'yup/lib/locale';
import axios from 'axios';

/* VALIDACIONES */
const validations = yup.object({
    name: yup.string().required('please type the product name'),
    description: yup.string().required('Description is required'),
    buy_price: yup
        .number()
        .positive('This value must be a positive value')
        .min(1, 'The value must be bigger than 0')
        .required('This camp is required'),
    sell_price: yup
        .number()
        .positive('This value is positive value')
        .moreThan(yup.ref('buy_price'), `The value sell must be greater than buy price`)
        .required('This camp is required'),
    gender: yup
        .string()
        .required('Specify at least one gender'),
    season: yup
        .string()
        .required('Select at least one season'),    // file: yup
    //   .mixed()
    //   .required('A file is required')
    //   .test('fileSize', 'File too large', value => value && value.size <= FILE_SIZE)
    //   .test(
    //     'fileFormat',
    //     'Unsupported Format',
    //     value => value && SUPPORTED_FORMATS.includes(value.type),
    //   ),
});
// 
/* COMPONENT */
export default function UpdateProduct() {
    const dispatch = useDispatch()
    const sizes: any = useSelector((state: RootState) => state.sizes)
    const { data: categories, error: errorC, isLoading: isLoadingC, isError: isErrorC, isSuccess: isSuccessC, currentData: currentDataC } = useGetCategoriesQuery()
    const { data } = useGetProductsQuery()
    useEffect(() => {
        dispatch(getSizes())
    }, [])
    /* HOOKS */
    const auth = useAuth()
    const formik = useFormik({
        initialValues: {  //!import correcto de los size y las categories
            id: '',
            id_category: '', //! ver que esté cambiado category ->  id_category
            name: '',
            description: '',
            gender: '',
            season: '',
            buy_price: '',
            sell_price: '',
        },
        validationSchema: validations,
        onSubmit: (values, { resetForm }: any) => {
            handleFormSubmit(values)
            Swal.fire({
                text: '¡Producto modificado con éxito!'
            });
            resetForm()
        },

    });
    const handleFormSubmit = async (values: any) => {
    const axiosP = await axios.put(Endpoint.updateProduct, values, { headers: { "authorization": 'bearer ' + auth.token } })
}

    return (
        <FormikProvider value={formik}>
            <Container component='main' maxWidth='xs'>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                    <Typography component='h1' variant='h5'>
                        Update Product
                    </Typography>
                    <Divider style={{ width: '100%' }} variant='middle' />
                    <Grid item xs={12} sm={12}>
                        <Select style={{ width: '100%' }} onChange={formik.handleChange} name={`id`}>
                            {data?.map((s: any) => {
                                return (
                                    <MenuItem value={s.id}>{s.name}</MenuItem>
                                )
                            })}
                        </Select>
                    </Grid>
                    <Box component='form' noValidate onSubmit={formik.handleSubmit} method='POST' action={Endpoint.postProduct} encType='multipart/form-data' sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            {/* NAME */}
                            <Grid item xs={12} sm={12}>
                                <InputLabel id='name'>Title Product</InputLabel>
                                <TextField
                                    autoComplete='given-name'
                                    name='name'
                                    required
                                    fullWidth
                                    id='name'
                                    label='Name'
                                    autoFocus
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                />
                            </Grid>
                            {/* DESCRIPTION */}
                            <Grid item xs={12} sm={12}>
                                <InputLabel id='description'>Product description</InputLabel>
                                <TextField
                                    required
                                    fullWidth
                                    id='description'
                                    name='description'
                                    label='Description'
                                    autoComplete='family-name'
                                    multiline
                                    rows={5}
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    error={formik.touched.description && Boolean(formik.errors.description)}
                                    helperText={formik.touched.description && formik.errors.description}
                                />
                            </Grid>
                            {/* GENDER */}
                            <Grid item xs={6} sm={6}>
                                <InputLabel id='gender'>Gender</InputLabel>
                                <Select
                                    fullWidth
                                    id='gender'
                                    labelId='gender'
                                    name='gender'
                                    label='Gender'
                                    value={formik.values.gender}
                                    onChange={formik.handleChange}
                                    error={formik.touched.gender && Boolean(formik.errors.gender)}>
                                    <MenuItem value={'Unisex'}>Unisex</MenuItem>
                                    <MenuItem value={'Male'}>Male</MenuItem>
                                    <MenuItem value={'Female'}>Female</MenuItem>
                                </Select>
                            </Grid>
                            {/* SEASON */}
                            <Grid item xs={6} sm={6}>
                                <InputLabel id='season'>Season</InputLabel>
                                <Select
                                    fullWidth
                                    id='season'
                                    labelId='season'
                                    name='season'
                                    label='Season'
                                    value={formik.values.season}
                                    onChange={formik.handleChange}
                                    error={formik.touched.season && Boolean(formik.errors.season)}>
                                    <MenuItem value={'Spring'}>Spring</MenuItem>
                                    <MenuItem value={'Summer'}>Summer</MenuItem>
                                    <MenuItem value={'Autumn'}>Autumn</MenuItem>
                                    <MenuItem value={'Winter'}>Winter</MenuItem>
                                </Select>
                            </Grid>
                            {/* Buy Price */}
                            <Grid item xs={6} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name='buy_price'
                                    id='buy_price'
                                    label='Buy Price'
                                    type='number'
                                    value={formik.values.buy_price}
                                    onChange={formik.handleChange}
                                    error={formik.touched.buy_price && Boolean(formik.errors.buy_price)}
                                    helperText={formik.touched.buy_price && formik.errors.buy_price}
                                />
                            </Grid>
                            {/* Sell Price */}
                            <Grid item xs={6} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name='sell_price'
                                    id='sell_price'
                                    label='Sell Price'
                                    type='number'
                                    value={formik.values.sell_price}
                                    onChange={formik.handleChange}
                                    error={formik.touched.sell_price && Boolean(formik.errors.sell_price)}
                                    helperText={formik.touched.sell_price && formik.errors.sell_price}
                                />
                            </Grid>
                            {/* Section */}
                            <Container>
                                <Typography mt={2} component='h1' variant='h6' textAlign='center'>
                                    Details
                                </Typography>
                            </Container>
                            {/* Category */}
                            <Grid item xs={12} sm={12}>
                                <InputLabel id='category'>Category</InputLabel>
                                <Select
                                    fullWidth
                                    id='id_category'
                                    labelId='id_category'
                                    name='id_category'
                                    label='Category'
                                    value={formik.values.id_category}
                                    onChange={formik.handleChange}
                                    error={formik.touched.id_category && Boolean(formik.errors.id_category)}>
                                    {categories?.map((c: any) => {
                                        return (
                                            <MenuItem value={c.id}>{c.category}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </Grid>
                        </Grid>
                        <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                            Update Product
                        </Button>
                        <Grid container justifyContent='flex-end'>
                            <Grid item>
                                {/* <Link href='#' variant='body2'>
                No hay categorias
              </Link> */}
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
            {/* <DeleteProduct />
      <UpdateStock /> */}
        </FormikProvider>
    )
}