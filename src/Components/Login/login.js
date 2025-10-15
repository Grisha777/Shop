import { useState } from 'react';
import cross from '../../images/cross.svg'
import './login.css'

export const LoginForm = ({onClose, goToRegister}) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');
    
    // Авторизация
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
            if (!login || !password) {
            setError('Введите логин и пароль');
            return;
        }

        fetch(`http://localhost:5000/users?login=${encodeURIComponent(login)}`)
        .then(res => res.json())
        .then(users => {
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
            onClose();
        }).catch(err => {
            console.error(err);
            setError('Ошибка при входе');
        });
    };

    return (
        <>
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
                        type='password'
                        placeholder='Пароль'
                        value={password}
                        onChange={(e) => setPassword(e.target.value.trim())}
                        required/>
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
        </>
    )
}