
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/store';

// 自定義 useDispatch 関数 
// 可以讓dispatch可以傳入非同步方法
export const useAppDispatch: () => AppDispatch = useDispatch