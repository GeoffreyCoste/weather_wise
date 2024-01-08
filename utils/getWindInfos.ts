export const getWindDirection = (degree: number | undefined): string => {

    if(!degree) {
      return '';
    }

    const directions = ['north', 'north_east', 'east', 'south_east', 'south', 'south_west', 'west', 'north_west'];

    return directions[Math.round(degree / 45) % 8];
}

export const getWindIconRotationClass = (direction: string) => {
    let style;
    switch (direction) {
      case 'north': 
        style = '0deg'
        break; 
      case 'north_east': 
        style = '45deg'
        break; 
      case 'east': 
        style = '90deg'
        break; 
      case 'south_east': 
        style = '135deg'
        break; 
      case 'south': 
        style = '180deg'
        break; 
      case 'south_west': 
        style = '225deg'
        break; 
      case 'west': 
        style = '270deg'
        break; 
      case 'north_west': 
        style = '315deg'
        break;
      default:
        style = '0deg'
    }
    return style;
}