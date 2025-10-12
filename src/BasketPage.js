import { Link } from "react-router-dom"

export const BasketPage = () => {
    return (
        <div>
            <p>Нет избранных товаров</p>
            <Link to="/">
                <div>Назад на главную</div>
            </Link>
        </div>
    )
}