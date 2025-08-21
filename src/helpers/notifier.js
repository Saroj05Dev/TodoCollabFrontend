import { Notyf } from "notyf";
import 'notyf/notyf.min.css';

export const notyf = new Notyf ({
    duration: 3000, // How long it shows
    position: {
        x: 'right',
        y: 'top'
    },
    dismissible: true,
    types: [
        {
            type: 'success',
            background: 'green',
            icon: false
        },
        {
            type: 'error',
            background: 'red',
            icon: true
        }
    ]
})