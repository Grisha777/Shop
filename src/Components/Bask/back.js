import { Link } from "react-router-dom"
import './back.css'

export const Back = () => {
    return (
        <div className="back">
            <Link to="/">
                <div>Назад на главную</div>
            </Link>
        </div>
    )
}