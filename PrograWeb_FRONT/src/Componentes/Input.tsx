import type { ChangeEvent } from "react";

interface FormInputProps {
    label: string;
    type: string;
    id: string;
    placeholder?: string;
    
    value: string;
    onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
}

const FormInput = (props: FormInputProps) => {
 

    return <div className="mb-3 text-start">
        <label htmlFor={props.id} className="form-label">{props.label}</label>

        <input
            type={props.type}
            className="form-control"
            id={props.id}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
        />
        </div>;
    
};


export default FormInput;
