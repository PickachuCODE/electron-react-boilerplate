import { Icon } from "@iconify/react";
import grid from '@iconify/icons-akar-icons/grid';
import trashCan from '@iconify/icons-akar-icons/trash-can';

import { useTheme } from "context/ThemeContext";

interface Icon{
    color?: string
    size?: number
}
export function GridOne_Icon(props: Icon) {
    const {theme}:any = useTheme()

  return (
    <Icon
      icon={grid}
      color={`${props.color || theme.color.secondaryColor}`}
      width={`${props.size || 24}`}
      style={{ pointerEvents: 'none' }}
    />
  );
}

export function Delete_Icon(props: Icon) {
    const {theme}:any = useTheme()

  return (
    <Icon
      icon={trashCan}
      color={`${props.color || theme.color.secondaryColor}`}
      width={`${props.size || 24}`}
      style={{pointerEvents : 'none'}}
    />
  );
}