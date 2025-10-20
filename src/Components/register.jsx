import { useState } from 'react';
import cross from '../images/cross.svg'
import off from '../images/visibility_off.svg'
import on from '../images/visibility.svg'

export const Register = ({ onClose, goToLogin }) => {
    const [name, setName] = useState('');
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const loginValid = (login) => {
        if (login.length < 3 || login.length > 20) return false;
        return /^[a-zA-Z0-9]([a-zA-Z0-9._-]*[a-zA-Z0-9])?$/.test(login);
    };

    const passwordValid = (pwd) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,14}$/.test(pwd);
    };

    // Регистрациия
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!name || !login || !email || !password) {
            setError('Заполните все поля');
            return;
        }

        if (!loginValid(login)) {
            setError('Логин: 3–20 символов, только буквы, цифры, . _ -, должен начинаться и заканчиваться буквой/цифрой');
            return;
        }

        if (!passwordValid(password)) {
            setError('Пароль: 8–14 символов, обязательно заглавная, строчная буква, цифра и один из: !@#$%');
            return;
        }
        
        // Проверка логина
        try {
            const checkResponse = await fetch(`http://localhost:5000/users?login=${encodeURIComponent(login)}`);
            const existingUsers = await checkResponse.json();

            if (existingUsers.length > 0) {
                setError('Пользователь с таким логином уже существует');
                return;
            }

            const newUser = { name, login, email, password };
            const createResponse = await fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
                });

            if (createResponse.ok) {
                alert('Регистрация успешна!');
                onClose();
            } else {
                setError('Ошибка при регистрации');
            }
        } catch (err) {
            console.error('Ошибка регистрации:', err);
            setError('Не удалось подключиться к серверу');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="login-header">
                <h2>Регистрация</h2>
                <button onClick={onClose} className='cross'>
                    <img src={cross} alt='закрыть'/>
                </button>
            </div>
            <div className="input">
                <input
                    type="text"
                    placeholder="Имя"
                    value={name}
                    onChange={(e) => setName(e.target.value.trim())}
                    required/>
                <input
                    type="text"
                    placeholder="Логин"
                    value={login}
                    onChange={(e) => setLogin(e.target.value.trim())}
                    required/>
                <input
                    type="email"
                    placeholder="Почта"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.trim())}
                    required/>
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value.trim())}
                    required/>
                    <button
                        type="button"
                        className="toggle-password-register"
                        onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <img src={on} alt='Открыт'/> : <img src={off} alt='Закрыт'/>}
                    </button>
                </div>
                {error && <div className="error">{error}</div>}
                <div className="buttons">
                <button type="submit" className="in">Зарегистрироваться</button>
                <button type="button" onClick={goToLogin} className="register">
                    Уже есть аккаунт? Войти
                </button>
            </div>
        </form>
    );
};