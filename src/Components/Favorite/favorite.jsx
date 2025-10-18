import favorite from '../../images/favorite.svg';
import './favorite.css'

export const Favorite = ({activeFavorites}) =>{
    return (
        <>
            <img src={favorite} alt="Избранное" width="24px" height="24px"
                className={activeFavorites ? 'active-favorite' : ''}/>
        </>
    )
}