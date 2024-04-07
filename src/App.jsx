import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        image: '' // Теперь image будет текстовым полем
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://658aa7e7ba789a96223780e2.mockapi.io/clocks', formData);
            alert('Товар успешно добавлен:', response.data);
        } catch (error) {
            alert('Произошла ошибка:', error.message);
        }
    };

    return (
        <div>
            <h2>Добавить новый товар</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Название:</label>
                <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
                <br />
                <label htmlFor="description">Описание:</label>
                <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} />
                <br />
                <label htmlFor="price">Цена:</label>
                <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} />
                <br />
                <label htmlFor="image">Ссылка на изображение:</label>
                <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} /> {/* Тип поля теперь text */}
                <br />
                <button type="submit">Отправить</button>
            </form>
        </div>
    );
}

export default App;
