import { useState, useEffect } from 'react';
import { useMediaQuery } from "react-responsive";
export default function DarkModeToggle() {
    const [isDark, setIsDark] = useState(true);
    const systemPrefersDark = useMediaQuery(
        {
          query: "(prefers-color-scheme: dark)",
        },
        undefined,
        (isSystemDark) => setIsDark(isSystemDark)
    );
    
    function handleClick() {
        setIsDark(prevState => prevState ? false : true)
    }

    useEffect(() => {
        if (isDark) {
          document.getElementById('main').classList.add('dark-mode');
          document.getElementById('html').classList.add('dark-mode');
        } else {
          document.getElementById('main').classList.remove('dark-mode');
          document.getElementById('html').classList.remove('dark-mode');
        }
      }, [isDark]);
    return (
        <button onClick={handleClick}>
            <img src={isDark ? "sun.svg" : "moon.svg"} alt="" />
        </button>
    )
}