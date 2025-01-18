import { useEffect, useState } from 'react';
import Description from './Description/Description';
import Options from './Options/Options';
import Feedback from './Feedback/Feedback';
import Notification from './Notification/Notification';

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

  //При зміні значень об'єкту зберігаємо дані в LocalStorage
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(reviewsData));
  }, [reviewsData]);

  //Отримуємо сумму значень перерахованих властивостей об'єкта
  const numbers = Object.values(reviewsData);
  const totalFeedback = numbers.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );

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
        <Feedback reviewsData={reviewsData} totalFeedback={totalFeedback} />
      )}
    </>
  );
}

export default App;
