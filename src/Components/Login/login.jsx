import { useState } from 'react';
import { useAuth } from '../AuthContext';
import cross from '../../images/cross.svg'
import off from '../../images/visibility_off.svg'
import on from '../../images/visibility.svg'
import './login.css'

export const LoginForm = ({onClose, goToRegister}) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { login_user } = useAuth();
    
    // Аутентификация
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
            
        if (!login || !password) {
            setError('Введите логин и пароль');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/users?login=${encodeURIComponent(login)}`);
            const users = await response.json();
            const user = users[0];

            if (!user) {
                setError('Пользователь не найден');
                return;
            }

            if (user.password !== password) {
                setError('Неверный пароль');
                return;
            }

            localStorage.setItem('currentUser', JSON.stringify({
            id: user.id, login: user.login, name: user.name
        }));
            alert(`Добро пожаловать, ${user.name}!`);
            login_user(user);
            onClose();
        } catch(err){
            console.error(err);
            setError('Ошибка при входе');
        };
        
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='login-header'>
                <h2>Вход</h2>
                <button onClick={onClose} className='cross'>
                    <img src={cross} alt='закрыть'/>
                </button>
            </div>
            <div className='input'>
                <input
                    className='login'
                    type='text'
                    placeholder='Логин'
                    value={login}
                    onChange={(e) => setLogin(e.target.value.trim())}
                    required/>
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value.trim())}
                    required/>
                    <button
                        type="button"
                        className="toggle-password-login"
                        onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <img src={on} alt='Открыт'/> : <img src={off} alt='Закрыт'/>}
                    </button>
            </div>
            <div className='buttons'>
                {error && <div className="error">{error}</div>}
                <button type='submit' className='in'>
                    Войти
                </button>
                <button
                    type="button"
                    onClick={goToRegister}
                    className="register">
                    Зарегистрироваться
                </button>
            </div>
         </form>
    )
}