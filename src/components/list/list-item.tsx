import { isEmpty } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';

type ListItemProps = {
  onChange: (value, index) => void;
  value: string;
  index: number;
  placeholder?: string;
};
export const ListItem: React.FC<ListItemProps> = ({
  onChange,
  value,
  index,
  placeholder,
}) => {
  // Refs.
  const inputRef = useRef<HTMLInputElement>(null);

  // States.
  const [inputValue, setInputValue] = useState(value);
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (active) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    } else {
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  }, [active]);

  return (
    <div
      className="list-item"
      onClick={() => {
        setActive(true);
      }}
    >
      {active ? (
        <Form.Control
          ref={inputRef}
          type="text"
          value={inputValue}
          onBlur={() => {
            setActive(false);
          }}
          onChange={(e) => setInputValue(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onChange(inputValue, index);
              setActive(false);
            } else if (e.key === 'Escape') {
              setActive(false);
            }
          }}
        />
      ) : (
        <span>{!value ? placeholder : value}</span>
      )}
    </div>
  );
};
