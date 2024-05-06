import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { TrashFill } from 'react-bootstrap-icons';
import { ListItem } from './list-item';

type ListProps = {
  listItems?: Array<string>;
  header: string;
  onChange: (type: string, foodList) => void;
  onDelete: (type: string, index: number) => void;
  type: string;
};

export const List: React.FC<ListProps> = ({
  listItems,
  header,
  onChange,
  onDelete,
  type,
}) => {
  const [list, setList] = useState<Array<string> | undefined>(listItems);

  const onChangeValue = (newValue, index) => {
    if (list) {
      const newList = [...list];
      newList[index] = newValue;
      setList(newList);
      onChange(type, newList);
    }
  };

  const onClickDelete = (index) => {
    onDelete(type, index);
  };

  useEffect(() => {
    if (listItems) {
      setList(listItems);
    }
  }, [listItems]);

  return (
    <div className="list-container">
      <h2 className="list-header">{header}</h2>
      <ListGroup className="list">
        {list?.map((listItem, index) => (
          <ListGroup.Item key={index}>
            <ListItem onChange={onChangeValue} value={listItem} index={index} />
            <TrashFill
              className="list-item-icon"
              color="#ff6048"
              size={20}
              onClick={() => onClickDelete(index)}
            />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};
