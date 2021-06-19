import styles from "./StoryItem.module.css";
import { StoryItemProps } from "./StoryItem.interface";
import { Reader } from "..";
import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const StoryItem: React.FC<StoryItemProps> = ({
  image,
  title,
  content,
  description,
  className,
  ...props
}) => {
  const [isRead, setIsRead] = useState(false);

  return (
    <div className={cn(className, styles.container)} {...props}>
      <div className={cn(styles.card)}>
        {!isRead && (
          <div className={cn(styles.story)}>
            <div className={styles.title}>{title}</div>
            <div className={styles.image}>
              <Image src={image} alt={title} layout="fill" objectFit="cover" />
            </div>
            <div className={styles.description}>
              <div>{description}</div>
              <div className={styles.controls}>
                <button
                  className={cn(styles.button, styles.buttonRead)}
                  onClick={() => setIsRead(true)}
                >
                  Читать
                </button>
                <Link href="/" passHref>
                  <button className={cn(styles.button, styles.buttonBack)}>
                    Вернуться к списку историй
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
        {isRead && (
          <Reader
            onBackClick={setIsRead}
            content={content}
            title={title}
            isRead={isRead}
          />
        )}
      </div>
    </div>
  );
};
