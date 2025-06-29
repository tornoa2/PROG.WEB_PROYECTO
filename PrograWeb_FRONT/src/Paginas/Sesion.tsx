import { useState, type FormEvent } from "react"
import AuthCard from "../Componentes/Tarjeta"
import FormInput from "../Componentes/Input"
import SubmitButton from "../Componentes/Boton"
import FormTitle from "../Componentes/Titulo"
import { Link } from "react-router-dom"
import { revisarAdmin } from "../Utils/admins"
import { useNavigate } from "react-router-dom"

const IniciarSesion = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    let siExiste: null | boolean = true

    const handleSubmit = (evt: FormEvent) => {
        evt.preventDefault()
        // prueba
        console.log({email, password })

        // verificacion que existan en base de datos, ahorita prelim
        siExiste = true
        sessionStorage.setItem("mail", email)
        if (revisarAdmin(email, password)) {
            navigate("/games")
        }
    }

    return (
        <AuthCard>
            <form onSubmit={handleSubmit}>
                <FormTitle
                    title="Iniciar Sesión en GameStore"
                    description="Llene los siguientes datos para ingresar:"
                />
                <FormInput
                    label="Correo Electrónico"
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                />
                <FormInput
                    label="Contraseña"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                />
                <SubmitButton label="Ingresar" className="mx-auto p-2" />
            </form>
            {(() => {
                if (
                    !siExiste ||
                    !email.includes("@") ||
                    !email.includes(".") ||
                    password == ""
                ) {
                    return (
                        <button
                            type="button"
                            className="btn btn-danger mx-auto p-2"
                        >
                            
                        </button>
                    )
                }
            })()}

            <div className="row justify-content-around">
                <div className="col-4">
                    <Link to="/crear_cuenta" className="d-block mt-3">
                        ¿No tienes una cuenta?
                    </Link>
                </div>
                <div className="col-4">
                    <Link to="/cambio-contra" className="d-block mt-3">
                        ¿Olvidaste tu contraseña?
                    </Link>
                </div>
            </div>
        </AuthCard>
    )
}

export default IniciarSesion
