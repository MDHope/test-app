import styles from "./Card.module.css";
import cn from "classnames";
import { CardProps } from "./Card.interface";
import Link from "next/link";

export const Card: React.FC<CardProps> = ({
  id,
  image,
  title,
  className,
  ...props
}): JSX.Element => {
  return (
    <Link href="/stories/[id]" as={`/stories/${id}`} passHref>
        <div
          tabIndex={0}
          className={cn(className, styles.card)}
          {...props}
          style={{ background: `center / cover no-repeat url(${image})` }}
        >
          <div className={styles.title}>{title}</div>
        </div>
    </Link>
  );
};
