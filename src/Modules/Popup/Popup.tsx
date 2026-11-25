import { Dialog, Text } from '@mantine/core';
import classNames from 'classnames';
import PopupCard from '../../Components/PopupCard/PopupCard';
import styles from './style.module.css'
import CartEmpty from './../../assets/cart_empty.svg'
import { useTypedSelector, useTypedDispatch } from '../../hooks/redux';
import { togglePopup } from '../../reducers/CardSlice';

export default function Popup() {
  const {popup, basket} = useTypedSelector(state => state.cardReducer);
    const dispatch = useTypedDispatch();

  return (
    <>
      <Dialog
      data-testid='popup'
      className={classNames(
        basket.length > 0 ? styles.dialog : styles['dialog-empty']
      )}
        opened={popup.type === 'opened'}
        onClose={() => dispatch(togglePopup())}
        size="lg"
        position={{ top: 62, right: 20 }}
      >
        {basket.length === 0 ? (
          <div className={styles.container}>
            <img src={CartEmpty} alt="Empty" />
          <Text className={styles.empty}>Your cart is empty!</Text>
          </div>
        ) : (
          <>
          <ul className={styles['cart-list']}>
            {basket.map(item => (
              <li key={item.id}>
                <PopupCard 
                id={item.id}
                name={item.name}
                image={item.image}
                price={item.price}
                count={item.count}
                />
                </li>
            ))}
          </ul>
          <Text className={styles['total-price']}>
            <span className={styles.total}>Total</span>
            <span className={styles.price} data-testid='total-price'>$ {basket.reduce((acc, item) => acc + item.price * item.count, 0)}</span>
          </Text>
          </>
        )}
      </Dialog>
    </>
  );
}