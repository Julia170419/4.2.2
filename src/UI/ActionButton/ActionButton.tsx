import { Group, ActionIcon } from '@mantine/core';
import classes from './styles.module.css';
import { useTypedDispatch } from '../../hooks/redux';
import { decrementCount, incrementCount } from '../../reducers/CardSlice';
import type { VegetableCard } from '../../types/VegetableCard';

type ActionButtonProps = {
  item: VegetableCard;
}

export default function ActionButton({ item }: ActionButtonProps) {
  const dispatch = useTypedDispatch();

  return (
      <Group justify="center" className={classes.buttons}>
        <ActionIcon 
        size="md" 
        variant="default" 
        aria-label="Danger variant"
        onClick={() => dispatch(decrementCount(item))}
        disabled={item.count<1}
        >
          <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect y="2" width="2" height="12" transform="rotate(-90 0 2)" fill="currentColor"/>
          </svg>
        </ActionIcon>
          {item.count ? item.count : '0'}
        <ActionIcon 
        size="md" 
        variant="default" 
        aria-label="Primary variant"
        onClick={() => dispatch(incrementCount(item))}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 0H5V5H0V7H5V12H7V7H12V5H7V0Z" fill="currentColor"/>
</svg>
        </ActionIcon>
      </Group>
  );
}