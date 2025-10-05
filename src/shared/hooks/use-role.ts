import { type Role, ROLE } from '@shared/constant/role';
import { atom, useAtomValue, useSetAtom } from 'jotai';

const roleAtom = atom<Role>(ROLE.LOGOUT);

export const useRole = () => {
  const role = useAtomValue(roleAtom);
  const setRole = useSetAtom(roleAtom);
  return { role, setRole };
};
