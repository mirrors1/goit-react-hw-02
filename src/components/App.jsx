import { useEffect, useState } from 'react';
import Description from './Description/Description';
import Options from './Options/Options';
import Feedback from './Feedback/Feedback';
import Notification from './Notification/Notification';
import { Chart } from './Chart/Chart';
import s from './App.module.css';

const LS_KEY = 'feedback-cd330120-98f4-4795-8a1e-2acb7efad19c';

function App() {
  //Початкове значення об'єкту
  const initReviewsData = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  //Зчитуємо дані з LocalStorage
  //Якщо дані відсутні - зберігаємо початкове значення об'єкту в LocalStorage
  const [reviewsData, setReviewsData] = useState(
    () => JSON.parse(localStorage.getItem(LS_KEY)) ?? initReviewsData
  );
  // Отримуємо ключі для діаграми
  const [reviewsOptions, setReviewOption] = useState(
    Object.keys(reviewsData) ?? []
  );
  // Отримуємо дані для діаграми
  const [reviewsOptionsData, setReviewOptionData] = useState(
    Object.values(reviewsData) ?? []
  );

  //При зміні значень об'єкту зберігаємо дані в LocalStorage
  useEffect(() => {
    //Оновлюємо список ключів
    setReviewOption(Object.keys(reviewsData) ?? []);
    //Оновлюємо список значень
    setReviewOptionData(Object.values(reviewsData) ?? []);
    localStorage.setItem(LS_KEY, JSON.stringify(reviewsData));
  }, [reviewsData]);

  //Отримуємо сумму значень перерахованих властивостей об'єкта
  const numbers = Object.values(reviewsData);
  const totalFeedback = numbers.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );

  //Обчислюємо відсоток позитивних відгуків
  const positiveFeedback = Math.round((reviewsData.good / totalFeedback) * 100);

  //Обробляємо події після натискання кнопок
  function updateFeedback(feedbackType) {
    //Якщо настиснута кнопка Reset - зберігаємо початкове значення об'єкту
    if (feedbackType === 'reset') {
      setReviewsData(initReviewsData);
      return;
    }
    //Cтворюємо новий об'єкт, розгортаємо в нього поточний стан, щоб зберегти властивості, і потім змінюємо лише властивість, по якій була натиснута кнопка.
    setReviewsData(prev => ({
      ...prev,
      [feedbackType]: prev[feedbackType] + 1,
    }));
  }

  return (
    <>
      <Description />
      <Options
        updateFeedback={updateFeedback}
        reviewsData={reviewsData}
        totalFeedback={totalFeedback}
      />
      {totalFeedback === 0 ? (
        <Notification />
      ) : (
        <div className={s.feedbackContainer}>
          <Feedback
            reviewsData={reviewsData}
            totalFeedback={totalFeedback}
            positiveFeedback={positiveFeedback}
          />
          <Chart labels={reviewsOptions} datasetsData={reviewsOptionsData} />
        </div>
      )}
    </>
  );
}

export default App;
