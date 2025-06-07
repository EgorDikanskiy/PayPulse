import React from 'react';
import Nav from 'components/Nav';
import { Button } from 'components/ui/Button';
import styles from './Report.module.scss';

const Report: React.FC = () => {
  const handleDownload = () => {
    // Здесь будет логика скачивания файла
    console.log('Downloading report...');
  };

  return (
    <div className={styles.reportContainer}>
      <h1 className={styles.title}>Отчет и рекомендации</h1>

      <div className={styles.downloadSection}>
        <Button onClick={handleDownload}>Скачать отчет</Button>
      </div>

      <div className={styles.recommendations}>
        <h2>Рекомендации</h2>
        <div className={styles.recommendationText}>
          <p>1. Регулярно проверяйте статус ваших отправлений</p>
          <p>2. Используйте трекинг-номер для отслеживания посылки</p>
          <p>3. Сохраняйте все документы, связанные с отправкой</p>
          <p>4. При возникновении вопросов обращайтесь в службу поддержки</p>
          <p>5. Следите за обновлениями в личном кабинете</p>
        </div>
      </div>
    </div>
  );
};

export default Report;
