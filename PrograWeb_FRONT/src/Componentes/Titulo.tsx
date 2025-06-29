interface FormTitleProps {
    title: string;
    description: string;
}

const FormTitle = (props: FormTitleProps) => {
    return <>
        <h3 className="card-title mb-3">{props.title}</h3>
        <div className="form-text mb-3">{props.description}</div>
    </>;
};

export default FormTitle;
