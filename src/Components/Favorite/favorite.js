import './favorite.css'
import favorite from '../../images/favorite.svg';

export const Favorite = ({active}) =>{
    return (
         <div>
            <img src={favorite} alt="Избранное"/>
            {/* количество в избранном */}
        </div>
    )
}