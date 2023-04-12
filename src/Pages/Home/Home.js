import React from 'react';
import fasolyaa from '../../assets/images/fasolyaa.png';
import './Home.css';

function Home () {
    return (
        <div className='home'>
            <img src={fasolyaa} alt="fasolyaa" border="0" />
            <h1>مرحبا بكم في "فا صول يا"</h1>
            <p>منصة صوتية عربية عائلية اسمها مستوحى من السلّم الموسيقي أبدعتها عائلتنا التي تشبه عائلتكم إلى حد كبير، نحن نشعر كما تشعرون في كثير من الأحيان بأننا نعيش في عالم مختلف عن عالم الاطفال ونجهل ما يحدث فيه، "فا صول يا" توفر لكم محطة الالتقاء بين العالمين.</p>
        </div>
    );
}

export default Home;