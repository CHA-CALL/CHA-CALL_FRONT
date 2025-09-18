import { type Role, ROLE } from '@shared/constant/role';
import { create } from 'zustand';

interface RoleState {
  role: Role;
  setRole: (_role: Role) => void;
  getRole: () => Role;
  updateRole: (_role: Role) => void;
}

export const useRole = create<RoleState>((set, get) => ({
  role: ROLE.USER,
  setRole: (role: Role) => set({ role }),
  getRole: () => get().role,
  updateRole: (role: Role) => set({ role }),
}));
