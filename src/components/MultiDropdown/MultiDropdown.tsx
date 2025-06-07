import React, { useState, useRef, useEffect } from 'react';
import styles from './MultiDropdown.module.scss';

interface Option {
  key: string;
  value: string;
}

interface MultiDropdownProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  required?: boolean;
}

export const MultiDropdown: React.FC<MultiDropdownProps> = ({ options, value, onChange, required }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (optionKey: string) => {
    const newValue = value.includes(optionKey) ? value.filter((key) => key !== optionKey) : [...value, optionKey];
    onChange(newValue);
  };

  const selectedOptions = options.filter((option) => value.includes(option.key));
  const displayText =
    selectedOptions.length > 0 ? selectedOptions.map((option) => option.value).join(', ') : 'Выберите источники';

  return (
    <div className={styles.container} ref={dropdownRef}>
      <div
        className={`${styles.trigger} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
      >
        <span className={selectedOptions.length === 0 ? styles.placeholder : ''}>{displayText}</span>
        <span className={styles.arrow}>▼</span>
      </div>
      {isOpen && (
        <div className={styles.options}>
          {options.map((option) => (
            <label key={option.key} className={styles.option}>
              <input type="checkbox" checked={value.includes(option.key)} onChange={() => toggleOption(option.key)} />
              <span>{option.value}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
