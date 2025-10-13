import Logo from '../../images/LEGO.png'
import './footer.css'
export const Footer = () => {
    return (
        <div className='footer-container'>
            <img src={Logo} className='logo' alt='Логотип'/>
        </div>
    )
}