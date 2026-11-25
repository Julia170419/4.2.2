import { useTypedSelector, useTypedDispatch } from '../../hooks/redux';
import { fetchCards } from '../../reducers/CardsThunks'
import VegetableCard from '../../Components/VegetableCard'
import { useEffect } from 'react';
import styles from './style.module.css'

export default function Main () {

    const {cardList, basket, isLoading, error} = useTypedSelector(state => state.cardReducer);
    const dispatch = useTypedDispatch();

    useEffect(() => {
        dispatch(fetchCards());
    }, [])

    useEffect(() => {
        localStorage.setItem('basket', JSON.stringify(basket))
    }, [basket])

    return (
        <main className={styles.main}>
            <h1 className={styles.title}>Catalog</h1>
            <ul className={styles['vegetable-list']}>
                {isLoading && 'Загрузка'}
                {error && <div>{error}</div>}
                {cardList.map(vegetable => (<li key={vegetable.id}>
                    <VegetableCard 
                    id={vegetable.id}
                    name={vegetable.name}
                    image={vegetable.image}
                    price={vegetable.price}
                    count={0}
                    />
                </li>))}
            </ul>
        </main>
    )
}