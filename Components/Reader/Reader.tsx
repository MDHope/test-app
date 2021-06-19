import { ReaderProps } from "./Reader.interface";
import styles from "./Reader.module.css";
import cn from "classnames";
import { useState, useEffect } from "react";
import Link from "next/link";
import Range from "react-range";

export const Reader: React.FC<ReaderProps> = ({
  content,
  onBackClick,
  isRead,
  title,
  className,
  ...props
}): JSX.Element => {
  const contentArray = content.match(/\S.*?\."?(?=\s|$)/g);
  const [showArray, setShowArray] = useState<Array<boolean>>([]);
  const [interval, setInterval] = useState(5);
  const [pause, setPause] = useState(false);

  const setShowSentence = () => {
    if (contentArray && contentArray.length > showArray.length) {
      setShowArray((showArray) => [...showArray, true]);
      const index = showArray.lastIndexOf(true);
      localStorage.setItem("sentence", contentArray[index + 1]);
    }
  };

  useEffect(() => {
    if (!contentArray) return;
    const index = contentArray.indexOf(
      localStorage.getItem("sentence") as string
    );
    if (localStorage.getItem("sentence") !== null && index !== -1) {
      // const index = contentArray.indexOf(
      //   localStorage.getItem("sentence") as string
      // );
      setShowArray(new Array(index + 1).fill(true));
    }

    if (index === -1) {
      setShowSentence();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (pause) return;
    const timer = setTimeout(() => {
      setShowSentence();
    }, interval * 1000);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showArray, contentArray]);

  return (
    <div className={cn(className, styles.container)} {...props}>
      <div className={styles.title}>{title}</div>
      <div className={styles.controls}>
        <Link href="/" passHref>
          <button className={cn(styles.button, styles.buttonBack)}>
            Вернуться к списку историй
          </button>
        </Link>
        <button
          className={cn(styles.button, styles.buttonRead)}
          onClick={() => onBackClick(false)}
        >
          Вернуться к описанию истории
        </button>
        <div className={styles.timePicker}>
          <label>
            {`Скорость: ${interval}с`}
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={interval}
              onChange={(e) => setInterval(+e.target.value)}
            />
          </label>
        </div>
        <button
          className={cn(styles.button, {
            [styles.buttonStart]: pause,
            [styles.buttonPause]: !pause,
          })}
          onClick={() => setPause(!pause)}
        >
          {pause ? "Продолжить" : "Пауза"}
        </button>
      </div>
      <div className={styles.reader} onClick={() => setShowSentence()}>
        {contentArray?.map((sentence, index) => {
          return (
            <div key={index}>
              <div key={index}>
                {showArray[index] && (
                  <div className={styles.sentence}>{sentence}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
