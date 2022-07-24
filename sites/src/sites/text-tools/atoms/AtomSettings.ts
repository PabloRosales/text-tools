import { atom } from 'recoil';

interface ISettings {
  darkMode: boolean;
}

const defaultValue = {
  darkMode: false,
};

export const AtomSettings = atom<ISettings>({
  key: 'AtomSettings',
  default: defaultValue,
  effects: [
    ({ onSet, setSelf }) => {
      onSet((newValue, _, isReset) => {
        isReset ? localStorage.removeItem('AtomSettings') : localStorage.setItem('AtomSettings', JSON.stringify(newValue));
      });
      setSelf(JSON.parse(localStorage.getItem('AtomSettings') || JSON.stringify(defaultValue)));
    },
  ],
});
