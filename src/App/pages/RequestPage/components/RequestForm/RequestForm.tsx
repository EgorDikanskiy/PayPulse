import React, { useState } from 'react';
import { DatePicker } from 'components/DatePicker';
import { MultiDropdown } from 'components/MultiDropdown';
import { Button } from 'components/ui/Button';
import styles from './RequestFrom.module.scss';

type Sphere = 'office' | 'warehouse_express' | 'warehouse_extended' | 'delivery_express' | 'delivery_extended' | 'it';
type Experience = 'no_experience' | '1_3_years' | '3_6_years' | 'more_6_years';
type EmploymentType = 'full_time' | 'part_time' | 'project' | 'shift';
type PaymentFrequency = 'daily' | 'weekly' | 'biweekly';

const sphereOptions = [
  { key: 'office', value: 'Офисный' },
  { key: 'warehouse_express', value: 'Склад экспресс' },
  { key: 'warehouse_extended', value: 'Склад расширенный' },
  { key: 'delivery_express', value: 'Доставка экспресс' },
  { key: 'delivery_extended', value: 'Доставка расширенный' },
  { key: 'it', value: 'ИТ' },
];

const experienceOptions = [
  { key: 'no_experience', value: 'Нет опыта' },
  { key: '1_3_years', value: 'От 1 года до 3 лет' },
  { key: '3_6_years', value: 'От 3 до 6 лет' },
  { key: 'more_6_years', value: 'Более 6 лет' },
];

const employmentTypeOptions = [
  { key: 'full_time', value: 'Полная занятость' },
  { key: 'part_time', value: 'Подработка' },
  { key: 'project', value: 'Проект или разовое задание' },
  { key: 'shift', value: 'Вахта' },
];

const paymentFrequencyOptions = [
  { key: 'daily', value: 'Ежедневно' },
  { key: 'weekly', value: 'Еженедельно' },
  { key: 'biweekly', value: '2 раза в месяц' },
];

const dataSourceOptions = [
  { key: 'hh', value: 'hh.ru' },
  { key: 'superjob', value: 'superjob' },
  { key: 'avito', value: 'avito' },
];

export const RequestForm: React.FC = () => {
  const [sphere, setSphere] = useState<Sphere | ''>('');
  const [jobTitle, setJobTitle] = useState('');
  const [searchPeriodFrom, setSearchPeriodFrom] = useState<Date | null>(null);
  const [searchPeriodTo, setSearchPeriodTo] = useState<Date | null>(null);
  const [requirements, setRequirements] = useState('');
  const [experience, setExperience] = useState<Experience | ''>('');
  const [location, setLocation] = useState('');
  const [company, setCompany] = useState('');
  const [employmentType, setEmploymentType] = useState<EmploymentType | ''>('');
  const [paymentFrequency, setPaymentFrequency] = useState<PaymentFrequency | ''>('');
  const [education, setEducation] = useState('');
  const [dataSources, setDataSources] = useState<string[]>([]);

  const showITFields = sphere === 'it';
  const showExperienceFields = ['it', 'warehouse_express', 'delivery_extended'].includes(sphere as string);
  const showExtendedFields = ['warehouse_extended', 'delivery_extended'].includes(sphere as string);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      sphere,
      jobTitle,
      searchPeriodFrom,
      searchPeriodTo,
      requirements,
      experience,
      location,
      company,
      employmentType,
      paymentFrequency,
      education,
      dataSources,
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="sphere" className={styles.requiredLabel}>
          Сфера:
        </label>
        <select id="sphere" value={sphere} onChange={(e) => setSphere(e.target.value as Sphere)} required>
          <option value="">Выберите сферу</option>
          {sphereOptions.map((option) => (
            <option key={option.key} value={option.key}>
              {option.value}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="jobTitle" className={styles.requiredLabel}>
          Название вакансии:
        </label>
        <input type="text" id="jobTitle" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required />
      </div>

      <div className={styles.field}>
        <label className={styles.requiredLabel}>Период поиска:</label>
        <div className={styles.dateRange}>
          <div className={styles.dateField}>
            <label htmlFor="searchPeriodFrom" className={styles.requiredLabel}>
              От:
            </label>
            <DatePicker
              id="searchPeriodFrom"
              selected={searchPeriodFrom}
              onChange={(date) => setSearchPeriodFrom(date)}
              required
            />
          </div>
          <div className={styles.dateField}>
            <label htmlFor="searchPeriodTo" className={styles.requiredLabel}>
              До:
            </label>
            <DatePicker
              id="searchPeriodTo"
              selected={searchPeriodTo}
              onChange={(date) => setSearchPeriodTo(date)}
              required
              minDate={searchPeriodFrom || undefined}
            />
          </div>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.requiredLabel}>Источник данных:</label>
        <MultiDropdown options={dataSourceOptions} value={dataSources} onChange={setDataSources} required />
      </div>

      {showITFields && (
        <div className={styles.field}>
          <label htmlFor="requirements" className={styles.requiredLabel}>
            Требования:
          </label>
          <textarea id="requirements" value={requirements} onChange={(e) => setRequirements(e.target.value)} required />
        </div>
      )}

      {showExperienceFields && (
        <div className={styles.field}>
          <label htmlFor="experience" className={styles.requiredLabel}>
            Опыт:
          </label>
          <select
            id="experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value as Experience)}
            required
          >
            <option value="">Выберите опыт</option>
            {experienceOptions.map((option) => (
              <option key={option.key} value={option.key}>
                {option.value}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className={styles.field}>
        <label htmlFor="location" className={styles.optionalLabel}>
          Населённый пункт:
        </label>
        <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
      </div>

      <div className={styles.field}>
        <label htmlFor="company" className={styles.optionalLabel}>
          Компания:
        </label>
        <input type="text" id="company" value={company} onChange={(e) => setCompany(e.target.value)} />
      </div>

      {showExtendedFields && (
        <>
          <div className={styles.field}>
            <label htmlFor="employmentType" className={styles.optionalLabel}>
              Тип занятости:
            </label>
            <select
              id="employmentType"
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value as EmploymentType)}
            >
              <option value="">Выберите тип занятости</option>
              {employmentTypeOptions.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.value}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="paymentFrequency" className={styles.optionalLabel}>
              Частота выплат:
            </label>
            <select
              id="paymentFrequency"
              value={paymentFrequency}
              onChange={(e) => setPaymentFrequency(e.target.value as PaymentFrequency)}
            >
              <option value="">Выберите частоту выплат</option>
              {paymentFrequencyOptions.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.value}
                </option>
              ))}
            </select>
          </div>
        </>
      )}

      <div className={styles.field}>
        <label htmlFor="education" className={styles.optionalLabel}>
          Образование:
        </label>
        <input type="text" id="education" value={education} onChange={(e) => setEducation(e.target.value)} />
      </div>

      <Button type="submit">Получить статистику</Button>
    </form>
  );
};
