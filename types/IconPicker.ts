export default interface IconPickerProps {
  rowsInOnePage?: number;
  columnsInOnePage?: number;
  iconHeight?: number;
  iconWidth?: number;
  pickerHeight?: number;
  pickerWidth?: number;
  onSelect: (iconName: string) => void;
}
