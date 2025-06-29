interface SubmitButtonProps {
    label: string;
    className?: string
}

const SubmitButton = (props: SubmitButtonProps) => {
    return <button type="submit" className={`btn btn-primary mt-2 mb-2 w-100 ${ props.className ? props.className: "" }`}>
        {props.label}
    </button>;
};

export default SubmitButton;
