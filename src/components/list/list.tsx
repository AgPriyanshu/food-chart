import { ListGroup } from 'react-bootstrap';
import { ListItem } from './list-item';
import React, { useEffect, useState } from 'react';

type ListProps = { listItems?: Array<string>; header: string };

export const List: React.FC<ListProps> = ({ listItems, header }) => {
  const [list, setList] = useState<Array<string> | undefined>(listItems);

  const onChange = (newValue, index) => {
    if (list) {
      const newList = [...list];
      newList[index] = newValue;
      setList(newList);
    }
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
            <ListItem onChange={onChange} value={listItem} index={index} />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};
