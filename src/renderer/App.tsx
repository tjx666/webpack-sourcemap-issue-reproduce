import { useDispatch, useSelector } from 'react-redux';
import { increment } from './redux/features/counter';
import { RootState } from './redux/store';

export default function App() {
    const dispatch = useDispatch();
    const count = useSelector((state: RootState) => state.counter.count);

    function handleAdd() {
        dispatch(increment());
    }

    return (
        <div
            style={{
                marginTop: '60px',
                textAlign: 'center',
            }}
        >
            <h2>{count}</h2>
            <button onClick={handleAdd}>+</button>
        </div>
    );
}
