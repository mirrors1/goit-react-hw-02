import capitalizeFirstLetter from '../../helpers/capitalizeFirstLetter';
import { Chart } from '../Chart/Chart';
import s from './Feedback.module.css';

export default function Feedback({
  reviewsData,
  totalFeedback,
  positiveFeedback,
}) {
  //Отримуємо ключі об'єкту
  const reviewsOptions = Object.keys(reviewsData);
  //Отримуємо дані об'єкту
  const reviewsOptionsData = Object.values(reviewsData);

  return (
    <div className={s.feedback}>
      <ul className={s.list}>
        {/* Виводимо всі дані з об'єкту reviewsData*/}
        {reviewsOptions.map(options => (
          <li key={options} className={s.item}>
            <p className={s.dsc}>
              {/* Першу літеру робимо великою */}
              {capitalizeFirstLetter(options)}: {reviewsData[options]}
            </p>
          </li>
        ))}
        {/* //Виводимо статистику про зібрані відгуки */}
        <li className={s.item}>
          <p className={s.dsc}>Total: {totalFeedback}</p>
        </li>
        <li className={s.item}>
          <p className={s.dsc}>Positive: {positiveFeedback}&#37;</p>
        </li>
      </ul>
      {/* <Chart labels={reviewsOptions} datasetsData={reviewsOptionsData} /> */}
    </div>
  );
}
