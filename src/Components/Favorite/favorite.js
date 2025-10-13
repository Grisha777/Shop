import './favorite.css'
import favorite from '../../images/favorite.svg';

export const Favorite = ({activeFavorites}) =>{
    return (
        <>
            <img src={favorite} alt="Избранное" width="24px" height="24px"
                className={activeFavorites ? 'active-favorite' : ''}
            />
            {/* количество в избранном */}
        </>
    )
}