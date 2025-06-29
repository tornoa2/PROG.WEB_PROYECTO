import type { ReactNode } from "react";

interface AuthCardProps {
    children: ReactNode;
}

const AuthCard = (props: AuthCardProps) => {
    return <div className="container mt-5 justify-content-center d-flex">
        <div className="card" style={{ maxWidth: "500px", width: "100%" }}>
            <div className="card-body text-center">
                {props.children}
            </div>
        </div>
    </div>;
};

export default AuthCard;
