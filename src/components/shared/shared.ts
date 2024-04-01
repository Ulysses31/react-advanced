export interface SettingsBtnProps {
  id: any;
  settingItems: {
    name: string;
    description: string;
    href: string;
    icon: any;
  }[];
  callsToAction: {
    name: string;
    href: string;
    icon: any;
  }[];
  handleConfirmDlgOpen: (e: boolean, id: number) => void;
}

export const deleteDlgTitle = `Delete data`;
export const deleteDlgDescr =
  'Are you sure you want to delete this record? This action cannot be undone.';

export const getDtoColumnHeaders = (data: any[]) => {
  return Object.keys(data[0]);
};

export const getIcon: any = (navigation: any[], title: string) =>
  navigation
    .find((item: any) => {
      return item.name === title;
    })
    ?.icon({}, 7, 7);
