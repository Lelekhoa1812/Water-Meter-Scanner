// frontend nextjs-client/pages/index.js
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [fileName, setFileName] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const canvas = document.getElementById('waveCanvas');
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let waveOffset = 0;
    const wave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0077be';
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x++) {
        const y = Math.sin((x + waveOffset) * 0.05) * 10 + 20;
        ctx.lineTo(x, canvas.height - y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      ctx.fill();

      waveOffset += 2;
      requestAnimationFrame(wave);
    };
    wave();

    // Adjust canvas on window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch OCR data.');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <canvas id="waveCanvas" className={styles.canvas}></canvas>
      <div className={styles.overlay}>
        <h1 className={styles.title}>Water Meter OCR</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Enter file name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            required
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Extract Data</button>
        </form>

        {error && <p className={styles.error}>{error}</p>}

        {result && (
          <div className={styles.result}>
            <h2>Results</h2>
            <p>File Name: {result.fileName}</p>
            <p>Values: {result.values}</p>
            {result.missingIndexes.length > 0 && (
              <p className={styles.missing}>
                Missing values at indexes: {result.missingIndexes.join(', ')}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
