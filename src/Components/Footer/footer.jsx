import Logo from '../../images/LEGO.png'
import './footer.css'

export const Footer = () => {
    return (
        <footer>
            <div className='footer-container'>
                <img src={Logo} alt='Логотип'/>
            </div>
        </footer>
    )
}