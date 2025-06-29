export default function CambioContra() {
    return (
        <div className="container mt-5 justify-content-center d-flex">
            <div className="card" style={{ maxWidth: "500px", width: "100%" }}>
                <div className="card-body text-center">
                    <h3 className="card-title mb-4">Reestablecer Contraseña</h3>
                    <div className="mb-3 text-start">
                        <label className="form-label">
                            Correo Electrónico:
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="emailFormControl"
                            placeholder="correo@ejemplo.com"
                            aria-describedby="emailHelpBlock"
                        />
                        <div id="emailHelpBlock" className="form-text">
                            Debes ingresar tu correo verificado para mandarte un
                            mensaje de restauración de contraseña.
                        </div>
                    </div>
                    <div className="mb-3 text-start">
                        <label className="form-label">Nueva Contraseña:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="newPassFormControl"
                        />
                    </div>
                    <div className="mb-3 text-start">
                        <label className="form-label">
                            Confirmar Contraseña:
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="newPassConfFormControl"
                        />
                    </div>
                    <a href="#" className="btn btn-primary mt-2 mb-2">
                        Mandar correo de restauración
                    </a>
                </div>
            </div>
        </div>
    )
}
