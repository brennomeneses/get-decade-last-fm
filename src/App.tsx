import { SyntheticEvent, useEffect, useRef, useState } from 'react'
import './App.css'
import html2canvas from 'html2canvas'
import { getUserGens } from './functions/getUserGens'
import { Cell, Label, LabelList, Pie, PieChart } from 'recharts'
import { Languages, languages } from './assets/schemas/languages'
import { Background, Footer, Podium, Subtitle, Title } from './components/container'
import { FaShare } from 'react-icons/fa6'
import { BiSolidDownload } from 'react-icons/bi'

interface IGenerations {
  range: string;
  count: number;
}

const userLanguage = navigator.language;

function App() {
  const [ username, setUsername ] = useState<string>('');
  const [ image, setImage ] = useState<string | null>(null);
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ language, setLanguage ] = useState<Languages>('en');
  const [ band, setBand ] = useState<IGenerations[] | null>(null);
  
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(userLanguage === 'pt-BR'){
      setLanguage('pt');      
    }else if(userLanguage === 'de-DE'){
      setLanguage('de');
    } else {
      setLanguage('en');
    }
  }, []);

  useEffect(() => {
    if (band && band.length > 0 && componentRef.current) {
      createImage();
    }
  }, [band, componentRef]);



  const createImage = async () => {
    const { current } = componentRef;

    if(current){
      const canvas = await html2canvas(current, { scale: 1 });
      
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'image.png';
      link.href = image;
      
      setImage(image);
    }
  }

  const downloadImage = async () => {
    const { current } = componentRef;

    if(current){
      const canvas = await html2canvas(current, { scale: 1 });
      
      const image = canvas.toDataURL('image/png');
      setImage(image);

      const link = document.createElement('a');
      link.download = 'image.png';
      link.href = image;
      link.click();
    }
  }

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);
  
    const input = event.currentTarget.querySelector('input');
    const data = await getUserGens(input!.value);
    setUsername(input!.value);

    console.log(data);

    if(!data || typeof data === 'string'){
      alert('User not found');
      setLoading(false);
      return;
    }
  
    const total = data.reduce((acc, e) => acc + e.count, 0);
    setBand(data.map((e) => ({ range: e.range, count: (e.count / total) * 100 })).sort((a, b) => b.count - a.count));

    setLoading(false);
  };
  

  const share = async () => {
    const { current } = componentRef;

    if(current){
      const canvas = await html2canvas(current, { scale: 1 });

      canvas.toBlob(async (blob) => {
        console.log(blob);
        if(!navigator.share || !blob){
          console.log("Navigator does not support sharing");
          return
        };
        await navigator.share({ files: [new File([blob], 'image.png', { type: 'image/png' })] });
      });
    }


  }

  const COLORS = [
    { generation: 'Silent Generation', color: '#7CF5FF' },
    { generation: 'Baby Boomers', color: '#EE66A6' },
    { generation: 'Gen X', color: '#FFEB55' },
    { generation: 'Gen Y', color: '#06D001' },
    { generation: 'Gen Z', color: '#FF8F00' },
    { generation: 'Gen Alpha', color: '#E59BE9' },
  ];

  return (
    <>
    <select className='languages' value={language} onChange={(e) => setLanguage(e.target.value as Languages)}>
      <option value="en">🇺🇸&emsp; English</option>
      <option value="pt">🇧🇷&emsp; Português</option>
      <option value="de">🇩🇪&emsp; Deutsch</option>
    </select>
      <div style={{ paddingTop: '30px' }}>
        <a href="https://last.fm/" target="_blank">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Last.fm_favicon.png" className="logo" alt="Vite logo" />
        </a>
        <a>
          <img src="https://cdn-icons-png.flaticon.com/512/3208/3208749.png" className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Music Generations</h1>
      <h3>{languages[language].subtitle}</h3>
      <div className="card">
        <form className="input-group" onSubmit={handleSubmit}>
          <label htmlFor="username">{languages[language].placeHolder}</label>
          <input required id="username" type="text" placeholder={languages[language].placeHolder} />
          <button type="submit">{languages[language].submit}</button>
        </form>
        {image && (
            <>
              <img src={image} className="image" alt="image" />
              <br />
              <button onClick={share}>Share <FaShare/></button>
              <button onClick={downloadImage}><BiSolidDownload /></button>
            </>
          )}
        {loading && (
          <div className="loaderContainer">
            <div className="loader loader1"/>
            {languages[language].loading}
          </div>
          )}
          {band && (
            <>
              <Background style={{ marginTop: "-9999999999px", position: "fixed" }} ref={componentRef}>
                <Title>
                  My music Generations:
                  <Subtitle>{username}</Subtitle>
                </Title>
                <PieChart height={900} width={1000}>
                  <Pie 
                    data={band} 
                    dataKey="count"
                    legendType='cross'
                    cx="50%" 
                    cy="50%" 
                    innerRadius={"45%"} 
                    outerRadius={"60%"} 
                    fill="#82ca9d" 
                    isAnimationActive={false}
                  >
                    <Label 
                      value={`${band[0].range} : ${band[0].count.toFixed(0)}%`}
                      style={{ 
                        fill: 'white', 
                        fontWeight: 'bold', 
                        fontSize: '3.6em' 
                      }}
                      position="center"
                    />
                    <LabelList dataKey="range" offset={20} position="outside" stroke="0" style={{ fontWeight: 'bold', fontSize: '2.5em' }} />
                    {band.map((item: IGenerations) => (
                      <Cell key={item.range} fill={COLORS.find((e) => e.generation === item.range)?.color} />
                    ))}
                  </Pie>
                </PieChart>
                <Podium>
                  {band.sort((a, b) => b.count - a.count).map((item: IGenerations) => (
                      <>{item.range}: {item.count.toFixed(0)}% <br/> </>
                    ))}
                </Podium>
                <Footer>music-generations.vercel.app</Footer>
              </Background>
            </>
          )}
      </div>
      <p className="read-the-docs">
        {languages[language].liked} <a href="https://github.com/brennomeneses/get-decade-last-fm" target="_blank">{languages[language].supportMe}</a>
      </p>
      <p className="read-the-docs">
        <a href="https://last.fm/user/Koeninsberg" target="_blank">Last.FM </a>
        <a href="https://github.com/brennomeneses" target="_blank">GitHub </a>
      </p>
    </>
  )
}

export default App
