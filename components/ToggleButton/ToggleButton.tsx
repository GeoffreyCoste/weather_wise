import { ReactNode } from 'react'

type Props = {
    children: ReactNode;
    styles?: string;
    tabIndex: number;
    onClick: () => void;
    isDisabled: boolean;
}

const ToggleButton = ({children, styles, tabIndex, onClick, isDisabled }: Props) => {

    // 'group' css class allows to style children based on state of parent <button> 
    return (
      <button
          className={styles ? styles : "group w-5 h-5 relative z-40 flex flex-col justify-center items-center cursor-pointer"}
          tabIndex={tabIndex}
          onClick={onClick}
          disabled={isDisabled}
      >
          {children}
      </button>
    )
}

export default ToggleButton;