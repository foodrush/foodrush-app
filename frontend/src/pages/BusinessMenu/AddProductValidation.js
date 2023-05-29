// https://github.com/jquense/yup --> npm i yup

import { object, string, number, mixed } from 'yup';

//custiom validation schema
const AddProductValidation = object({
    // to customise error messages go inside the () and add your message
    name: string().required(),
    price: number().required().typeError('price field must be a number').positive().integer(),
    cuisine: string().required(),
    category: string().required(),
    count_in_stock: number().required().typeError('stock field must be a number').positive().integer(),
    description: string().required(),
    image: mixed().required('Image is required').test(
        'fileType',
        'File Format Not Supported',
        (value) => {
            if (value) {
                return value && ['image/jpeg', 'image/png'].includes(value.type);
            }
            return true;
        }
    )
});

export default AddProductValidation;
