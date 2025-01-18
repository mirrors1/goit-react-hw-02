import capitalizeFirstLetter from '../../helpers/capitalizeFirstLetter';
import s from './Options.module.css';

export default function Options({
  updateFeedback,
  reviewsData,
  totalFeedback,
}) {
  //Отримуємо ключі об'єкту
  const reviewsOptions = Object.keys(reviewsData);
  return (
    <ul className={s.list}>
      {/* Виводимо всі кнопки з об'єкту reviewsData */}
      {reviewsOptions.map(options => (
        <li key={options} className={s.item}>
          <button
            className={s.btn}
            onClick={() => {
              updateFeedback([options]);
            }}
          >
            {/* Першу літеру робимо великою */}
            {capitalizeFirstLetter(options)}
          </button>
        </li>
      ))}
      {/* Додаткова кнопка Reset для скидання зібраних відгуків */}
      {totalFeedback !== 0 && (
        <li className={s.item}>
          <button
            className={s.btn}
            onClick={() => {
              updateFeedback('reset');
            }}
          >
            Reset
          </button>
        </li>
      )}
    </ul>
  );
}
